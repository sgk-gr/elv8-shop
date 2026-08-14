import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

function ensureDataFile(): Subscriber[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      // Default initial mock subscribers so admin page looks great
      const initialData: Subscriber[] = [
        {
          id: "sub_1",
          email: "info@elv8now.com",
          subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          source: "Footer",
        },
        {
          id: "sub_2",
          email: "sales@sgk.gr",
          subscribedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          source: "Homepage Banner",
        },
      ];
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const content = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Error reading subscribers file:", error);
    return [];
  }
}

function saveSubscribers(subscribers: Subscriber[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing subscribers file:", error);
  }
}

export async function GET() {
  const subscribers = ensureDataFile();
  return NextResponse.json({
    success: true,
    total: subscribers.length,
    subscribers,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim()?.toLowerCase();
    const source = body?.source || "Website";

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Παρακαλώ εισάγετε ένα έγκυρο email." },
        { status: 400 }
      );
    }

    const subscribers = ensureDataFile();

    // Check if already subscribed
    const existing = subscribers.find((s) => s.email === email);
    if (existing) {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: "Είστε ήδη εγγεγραμμένος στο ενημερωτικό μας δελτίο!",
      });
    }

    const newSubscriber: Subscriber = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      subscribedAt: new Date().toISOString(),
      source,
    };

    subscribers.unshift(newSubscriber);
    saveSubscribers(subscribers);

    // Also forward to WordPress store API in real-time
    try {
      const wpRes = await fetch("https://store.elv8now.com/wp-json/elv8/v1/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const wpData = await wpRes.json();
      console.log("WordPress Newsletter Sync Result:", wpData);
    } catch (wpErr) {
      console.error("WordPress Newsletter Sync Error:", wpErr);
    }

    return NextResponse.json({
      success: true,
      message: "Ευχαριστούμε! Εγγραφήκατε επιτυχώς στο newsletter! 🎉",
      subscriber: newSubscriber,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Σφάλμα κατά την εγγραφή." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim()?.toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Δεν δόθηκε email για διαγραφή." },
        { status: 400 }
      );
    }

    let subscribers = ensureDataFile();
    const initialCount = subscribers.length;
    subscribers = subscribers.filter((s) => s.email !== email);

    if (subscribers.length === initialCount) {
      return NextResponse.json(
        { success: false, message: "Το email δεν βρέθηκε." },
        { status: 404 }
      );
    }

    saveSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      message: `Το email ${email} διαγράφηκε επιτυχώς.`,
      subscribers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Σφάλμα κατά τη διαγραφή." },
      { status: 500 }
    );
  }
}
