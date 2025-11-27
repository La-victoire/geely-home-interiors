"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { UsersProvider } from './UserContext'
import { ProductsProvider } from './ProductsContext'
import { CartProvider } from './CartContext'
import LayoutWrapper from '../LayoutWrapper'
import { Toaster } from 'sonner'

const Provider = ({ children, session }: { children: React.ReactNode, session:any }) => {
  return (
    <SessionProvider>
      <UsersProvider>
          <ProductsProvider>
          <CartProvider>
          <LayoutWrapper session={session}>
              {children}
            <Toaster position='top-right' richColors closeButton />
          </LayoutWrapper>
          </CartProvider>
          </ProductsProvider>
        </UsersProvider>
    </SessionProvider>
  )
}

export default Provider
