"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { UsersProvider } from './UserContext'
import { ProductsProvider } from './ProductsContext'
import { CartProvider } from './CartContext'
import LayoutWrapper from '../LayoutWrapper'
import { Toaster } from 'sonner'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <UsersProvider>
          <ProductsProvider>
          <CartProvider>
          <LayoutWrapper>
              {children}
            <Toaster position='bottom-right' richColors closeButton />
          </LayoutWrapper>
          </CartProvider>
          </ProductsProvider>
        </UsersProvider>
    </SessionProvider>
  )
}

export default Provider