"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { product } from '@/components/shop/Mini-Components/CollectionCard'
import { useProducts } from '@/components/contexts/ProductsContext'
import { toast } from 'sonner'
import { deleteProduct, postData } from '@/lib/actions'
import LoadMore from './mini-comp/LoadMore'
import ResetProducts from './mini-comp/ResetProducts'
import CreateProduct from './mini-comp/CreateProduct'

const Products = () => {
  const [items, setItems] = useState<product[]>([]);
  const [search, setSearch] = useState("")
  const {products} = useProducts() as {products:product[]}

    useEffect(()=> {
      setItems(products)
    },[])
  
    const handleDelete = async (id:string) => {
    setItems((prev)=>
      prev.filter((item) => item._id !== id)
    )
    try {
      const response = await deleteProduct(`/products/${id}`);
      if (response) {
        toast.success("Product deleted successfully!")
      } else {
        toast.error("Failed to delete product. Please try again.")
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred. Please try again.")
    }
    }

    const clearProducts = async () => {
      setItems([])
       try {
       const response = await deleteProduct(`/products`);
       if (response) {
         toast.success(response)
       } else {
        toast.error("Failed to Clear products. Please try again.")
       }
     } catch (error) {
       console.error("Error deleting products:", error);
       toast.error("An error occurred. Please try again.")
     }

    }
    
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader className='flex gap-5 justify-between'>
        <div>
          <CardTitle className='headFont not-sm:text-lg mb-3'>Product Inventory</CardTitle>
          <p className="not-sm:text-sm">Manage your product catalog and inventory</p>
        </div>
        <div className='flex gap-3 not-sm:mt-5'>
          <ResetProducts clearProducts={clearProducts}/>
          <CreateProduct items={items} setItems={setItems}/>
        </div>
      </CardHeader>
      <CardContent className='overflow-x-scroll'>
        {/* <div className='md:w-1/4 w-1/2'>
          <Input
           type='search'
           placeholder='Search...' 
           value={search}
           onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <Button
           onClick={()=> {

           }}
           variant={'outline'}
           size={"default"}
           >
            Search
          </Button>
        </div> */}
        {items.length < 1 ? (
          <p className='text-center headFont text-3xl'>
            No Products Available
          </p>
        ):(
          <table className='not-md:w-[150dvw] mt-5 w-full not-sm:text-sm'>
            <thead>
              <tr className=''>
                <th className=' not-md:w-full p-4 text-center border-0 border-b'>Name</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Category</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Price</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Sub-Category</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Discount Type</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Discount Ends</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Discount Amount</th>
                <th className=' p-3 text-center border-0 border-l border-b'>Actions</th>
              </tr>
            </thead>
            <LoadMore items={items} setItems={setItems} handleDelete={handleDelete}/>
          </table>
        )}
        {items.length < 1 && items.length > 0 && (
          <div className='text-center mt-5 headFont text-3xl'>
            Product Not Found
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Products;
