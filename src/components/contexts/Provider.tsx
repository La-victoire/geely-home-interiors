"use client"
import React from 'react'
import { UsersProvider } from './UserContext'
import { ProductsProvider } from './ProductsContext'
import { CartProvider } from './CartContext'
import LayoutWrapper from '../LayoutWrapper'
import { Toaster } from 'sonner'
import { OrderProvider } from './OrderContext'

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
      <UsersProvider>
          <ProductsProvider>
          <CartProvider>
          <OrderProvider>
          <LayoutWrapper>
              {children}
            <Toaster position='top-right' richColors theme='system' closeButton />
          </LayoutWrapper>
          </OrderProvider>
          </CartProvider>
          </ProductsProvider>
        </UsersProvider>
  )
}

export default Provider
