import { useCart } from '@/components/contexts/CartContext';
import { useUsers } from '@/components/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getData, createProfile } from '@/lib/actions';
import { cart } from '@/lib/cart';
import { cartProduct, User } from '@/lib/types';
import { Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

export type product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    categoryId: string;
    images: [{
      url: string,
      public_url: string
    }];
    stock:number;
    status:string;
    sku?: string;
    quantity?:number;
    rating?: number;
    dimensions:{};
    reviewsCount?: number;
    features: string[];
    colors?: string[];
}

interface products { 
  product:product
}

const CollectionCard:React.FC<products>  = ({product}) => {
  const {cartProducts, setCartCount} = useCart() as {cartProducts:cartProduct[],setCartCount:React.Dispatch<React.SetStateAction<number>>};
  const {users} = useUsers() as {users:User};

  const handleCart = () => {
     if (cartProducts.find((p) => p.product._id === product._id)) {
          createProfile('/carts/add', {product:product._id, quantity: 1, price: product.price})
          toast.success(
            "Product quantity updated in cart"
          )
          return;
        }
        setCartCount((prev:number) => prev + 1)
        createProfile('/carts/add', {product:product._id, quantity: 1, price: product.price})
        toast.success(
          "Product Added to cart"
        )
  };

  return (
    <Card className='lg:w-[30dvw] border-r-8 hover:border-r-2 duration-200 relative gap-0 p-0 h-[70dvh]'>
      <img 
      src={product?.images[0]?.url}
      alt='product-image'
      className='w-full relative rounded-t-2xl h-full not-sm:rounded-2xl md:h-1/2 object-cover'
      />
      <div className='absolute not-sm:flex hidden item-col pointer-events-none justify-end py-3 rounded-2xl bg-black/40 w-full h-full'/> 
      <div className='flex not-sm:text-white w-full p-5 not-sm:absolute bottom-0 text-center item-col gap-3'>
        <p className='headFont text-xl'>{product.name}</p>
        <p className='text-sm'>{product.description}</p>
        <div className='flex justify-between'>
          <p className='text-[#ed9e59] font-bold text-xl'>₦{product.price}</p>
          <p className='flex gap-2 flex-center'> <span className={product.status === "In Stock" ? "text-green-400" : "text-red-400"}>{product.status}</span> ({product.stock | 0})</p>
        </div>
        <div className='flex w-full justify-between'>
          <Link href={`products/${product._id}`}>
            <Button>View Details</Button>
          </Link>
          <Button disabled={product.status !== "In Stock" || users?.role === "Admin" && true } onClick={()=> handleCart()} className='bg-[#ed9e59] hover:bg-amber-300 text-white'>Add to Cart</Button>
        </div>
      </div>
    </Card>
  )
}

export default CollectionCard
