"use client"
import { Button } from '@/components/ui/button'
import { User } from '@/lib/types'
import { Trash2 } from 'lucide-react'
import React from 'react'

const UserTable = ({user, onDelete}:{user:User, onDelete: (id:string) => void}) => {
  const date = new Date(user?.createdAt)
  return (
    <tr className='border-0 border-b'>
      <td className='text-center p-3'>{user.firstname} {user.lastname}</td>
      <td className='text-center p-3'>{user.email}</td>
      <td className='text-center p-3'>{user?.phone || "null"}</td>
      <td className='text-center p-3'>{user?.createdAt ? date.toLocaleDateString() : "No Date Available"}</td>
      <td className='text-center'>{user.orders?.length | 0}</td>
      <td className={`md:px-5 px-2 py-3`}>
        <div className={`border font-semibold p-2 text-center rounded ${user.role === "Admin" ? "text-green-500 border-green-500 ": "text-yellow-300 border-yellow-500 "}`}>
          {user.role}
        </div>
      </td>
      <td className='text-center'>
        <Button 
          onClick={()=> onDelete(user._id)}
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
