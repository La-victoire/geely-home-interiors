"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Users from './tabs/Users'
import Products from './tabs/Products'
import Orders from './tabs/Orders'
import Review from './tabs/Reviews'

const ManagementTabs = () => {
  return (
    <div className='flex flex-1/2 justify-center items-center'>
      <Tabs className='w-full' defaultValue='Orders'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='Users'>Users</TabsTrigger>
          <TabsTrigger value='Products'>Products</TabsTrigger>
          <TabsTrigger value='Orders'>Orders</TabsTrigger>
          <TabsTrigger value='Reviews'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='Users'>
          <Users />
        </TabsContent>
        <TabsContent value='Products'>
          <Products />
        </TabsContent>
        <TabsContent value='Orders'>
          <Orders />
        </TabsContent>
        <TabsContent value='Reviews'>
          <Review />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ManagementTabs