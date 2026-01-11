"use client"
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import EditProduct from './EditProduct'
import { useState } from 'react'
import { product } from '@/components/shop/Mini-Components/CollectionCard'

const ProductTable = ({Product, onDelete}:{Product:any ,onDelete: (id:string) => void}) => {
  const [form , setForm] = useState<product>(Product);

  function formatIsoDate(isoString: string) {
      if (!isoString) return null;
      const date = new Date(isoString);

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
        day % 10 === 2 && day !== 12 ? "nd" :
        day % 10 === 3 && day !== 13 ? "rd" :
        "th";

      return `${month} ${day}${suffix}, ${year}`;
    }


  return (
    <tr className='border-0 border-b'>
      <td className='text-center not-md:w-full px-3'>{form.name}</td>
      <td className='text-center border-l p-3'>{form.category}</td>
      <td className='text-center border-l p-3'>₦{form.price}</td>
      <td className='text-center border-l p-3'>{form.subCategory}</td>
      <td className='text-center border-l p-3'>{form?.isXmasDeal && "Xmas-sale" || form?.isDiscountDeal && `${form.subCategory}-sale` || "No Discount"}</td>
      <td className='text-center border-l p-3'>{formatIsoDate(form.discountUntil) || "No Discount"}</td>
      <td className='text-center border-l p-3'>{(form?.isXmasDeal || form?.isDiscountDeal) ?form?.computedDiscountedPrice : 0 }%</td>
      <td className='border-l flex flex-center p-3 space-x-3'>
        <EditProduct form={form} setForm={setForm} />
        <Button
         onClick={() => onDelete(form._id)}
         variant="outline" 
         className='hover:bg-red-500 hover:text-white'
         >
          <Trash2 />
        </Button>
      </td>
    </tr>
  )
}

export default ProductTable
