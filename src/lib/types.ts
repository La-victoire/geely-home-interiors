import { product } from "@/components/shop/Mini-Components/CollectionCard";

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Payment {
  method: "credit_card" | "paypal" | "bank_transfer";
  transactionId: string;
  amount: number;
  currency: string;
}

export interface Order {
  _id: string;
  _createdAt: string; // ISO string
  status: "pending" | "shipped" | "paid" | "failed";
  client: string;
  amount: number;
  items: OrderItem[];
}

export interface cartProduct {
  product: {
    _id: string;
    name: string;
    stock: number;
    images: { url: string, public_url: string }[];
  };
  quantity: number;
  price: number;
}

export interface User {
  _id: string;
  firstname: string;
  role: "Client" | "Admin";
  lastname: string;
  email: string;
  phone: string;
  _createdAt: string;
  _updatedAt: string;
  status: string;
  passwordHash: string;
  addresses: Address[];
  orders: Order[];
  cart: cartProduct[];
}

export interface DiscountBadge {
  label: string
  percentage: number
  type: "xmas" | "subcategory" | "festive"
}

export function getDiscountBadges(product: product): DiscountBadge[] {
  const badges: DiscountBadge[] = []

  if (product.isXmasDeal) {
    badges.push({
      label: "Xmas Sale",
      percentage: 35,
      type: "xmas",
    })
  }

  if (product?.isDiscountDeal && product?.maxDiscountCap > 0) {
    badges.push({
      label: `${product.subcategory} Sale`,
      percentage: product.maxDiscountCap,
      type: "subcategory",
    })
  }

  return badges
}
