"use client";

import React from "react";
import dynamic from "next/dynamic";
import { UsersProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";
import LayoutWrapper from "../LayoutWrapper";
import { Toaster } from "sonner";

// Dynamically import ProductsProvider to guarantee it's client-only
const ProductsProvider = dynamic(
  () => import("./ProductsContext").then((mod) => mod.ProductsProvider),
  { ssr: false }
);

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UsersProvider>
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
            <LayoutWrapper>
              {children}
              <Toaster
                position="top-right"
                richColors
                theme="system"
                closeButton
              />
            </LayoutWrapper>
          </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </UsersProvider>
  );
};

export default Provider;
