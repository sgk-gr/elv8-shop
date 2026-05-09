export interface WooImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  image?: WooImage;
  count: number;
  parent: number;
}

export interface WooTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}


export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  type: "simple" | "variable" | "grouped" | "external";
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: WooImage[];
  categories: WooCategory[];
  sku: string;
  attributes: {
    id: number;
    name: string;
    position: number;
    visible: boolean;
    variation: boolean;
    options: string[];
  }[];
  variations: number[];
  stock_status: string;
  stock_quantity: number | null;
  average_rating: string;
}

export interface WooVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  attributes: {
    id: number;
    name: string;
    option: string;
  }[];
  image?: WooImage;
}

export interface CartItem {
  product: WooProduct;
  quantity: number;
  variationId?: number;
  selectedAttributes?: Record<string, string>;
}
