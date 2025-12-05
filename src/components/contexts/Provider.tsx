"use client"
import React from 'react'
import { UsersProvider } from './UserContext'
import { ProductsProvider } from './ProductsContext'
import { CartProvider } from './CartContext'
import LayoutWrapper from '../LayoutWrapper'
import { Toaster } from 'sonner'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
      <UsersProvider>
          <ProductsProvider>
          <CartProvider>
          <LayoutWrapper>
              {children}
            <Toaster position='top-right' richColors closeButton />
          </LayoutWrapper>
          </CartProvider>
          </ProductsProvider>
        </UsersProvider>
  )
}

export default Provider
