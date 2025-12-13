import CartTotal from '@/components/shop/CartTotal'
import AddressCard from '@/components/shop/Mini-Components/AddressCard'
import ContactCard from '@/components/shop/Mini-Components/ContactCard'
import React from 'react'

const page = () => {
  return (
    <main>
    <div className="px-10 pt-20 mb-10">
    <h1 className="headFont text-3xl md:text-5xl"> Checkout </h1>
    <p className="px-2">Shipment is free in lagos</p>
    </div>
    <div className="flex md:item-row item-col justify-evenly gap-3 p-2 md:p-5">
        <ContactCard />
        <AddressCard />
		    <CartTotal />    
    </div>
    </main>
  )
}

export default page
