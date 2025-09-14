"use client"
import { Button } from '@/components/ui/button'
import { User } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

const UserTable = ({user, onDelete}:{user:User, onDelete: (id:string) => void}) => {

  return (
    <tr className='border-0 border-b'>
      <td className='text-center p-3'>{user.firstname} {user.lastname}</td>
      <td className='text-center'>{user.email}</td>
      <td className='text-center'>{user.phone}</td>
      <td className='text-center p-3'>{new Date(user?.joinDate).toLocaleDateString()}</td>
      <td className='text-center'>{user.orders.length}</td>
      <td className={`md:px-5 px-2 py-3`}>
        <div className={`border font-semibold not-sm:p-2 py-2 text-center text-white rounded-full ${user.status === "Active" ? "bg-green-300 border-green-500 ": "bg-red-300 border-red-500 "}`}>
          {user.status}
        </div>
      </td>
      <td className='text-center'>
        <Button 
          onClick={()=> onDelete(user.id)}
          variant="outline"
          className='hover:bg-red-500 hover:text-white'
          >
            <Trash2 />
          </Button>
      </td>
    </tr>
  )
}

export default UserTable