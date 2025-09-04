import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Login from './Login'
import Register from './Register'

const TabSelector = () => {
  return (
    <div className='not-sm:px-3 px-7 flex flex-1/2 justify-center items-center'>
      <Tabs className='w-full' defaultValue='Login'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='Login'>Log-in</TabsTrigger>
          <TabsTrigger value='Register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='Login'>
          <Login />
        </TabsContent>
        <TabsContent value="Register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabSelector