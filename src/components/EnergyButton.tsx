"use client";

import { useRef, useLayoutEffect, useState, useId } from "react";
import Link from "next/link";

export default function EnergyButton() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0, path: "", perimeter: 0 });
  const uid = useId().replace(/:/g, "_");

  useLayoutEffect(() => {
    const calculate = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.offsetWidth;
      const h = wrapperRef.current.offsetHeight;
      if (w === 0 || h === 0) return;
      const r = h / 2;
      const path = `M ${r},0 L ${w - r},0 A ${r},${r} 0 0 1 ${w - r},${h} L ${r},${h} A ${r},${r} 0 0 1 ${r},0 Z`;
      const perimeter = (w - h) * 2 + Math.PI * h;
      setDims({ width: w, height: h, path, perimeter });
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  const trackId = `track-${uid}`;
  const glowId = `glow-${uid}`;

  const p = dims.perimeter;

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <Link
        href="/products"
        className="relative z-10 bg-transparent text-white px-10 md:px-12 py-3.5 md:py-4 rounded-full font-black text-sm md:text-base tracking-wide hover:scale-105 hover:bg-white/10 transition-all duration-300 inline-block"
      >
        Order Now
      </Link>

      {dims.width > 0 && (
        <svg
          style={{
            position: "absolute",
            top: 0, left: 0,
            overflow: "visible",
            pointerEvents: "none",
            zIndex: 20,
          }}
          width={dims.width}
          height={dims.height}
        >
          <defs>
            <filter id={glowId} x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path id={trackId} d={dims.path} fill="none" />

          {/* Faint static base border */}
          <use href={`#${trackId}`} fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.2" />

          {/* Single elegant glowing arc — slow neon sweep */}
          <use
            href={`#${trackId}`}
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.9"
            strokeDasharray={`${p * 0.22} ${p * 0.78}`}
            filter={`url(#${glowId})`}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to={`-${p}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </use>
        </svg>
      )}
    </div>
  );
}
