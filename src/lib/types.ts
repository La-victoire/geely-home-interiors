export interface Address {
  id: string;
  type: "home" | "work" | "other";
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
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
  id: string;
  date: string; // ISO string
  status: "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddressId: string;
  payment: Payment;
  items: OrderItem[];
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  passwordHash: string;
  addresses: Address[];
  orders: Order[];
}