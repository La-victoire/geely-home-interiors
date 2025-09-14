"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect, useMemo, useState } from 'react'
import { product } from '@/components/shop/Mini-Components/CollectionCard'
import { products } from '@/components/constants'
import ProductTable from './mini-comp/ProductTable'
import { Button } from '@/components/ui/button'
import { ArrowUpRightSquare, PlusCircle, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'


const Products = () => {
    const [items, setItems] = useState<product[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [color, setColor] = useState<string>("");
    const [search, setSearch] = useState("")
    const [Feat, setFeat] = useState<string[]>([]);
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState({
      name:"",
      category:"",
      stock:"",
      price:"",
      description:"",
      images:[],
      features:Feat,
      dimensions:{
        width:"",
        height:"",
      },
      colors:colors,
      status:"",
    })

    useEffect(()=> {
      setItems(products)
    },[])

    const increaseFeatures = () => {
      setFeat((prev) => [...prev, ""])
    }

    const decreaseFeatures = (index:number) => {
      const updated = product.features.filter((_,idx) => idx !== index)
      setProduct({...product, features : updated})
    }

    const modifyFeatures = (index:number, value:string) => {
      const updated = [...Feat];
      updated[index] = value;
      setFeat(updated);
      setProduct({...product, features : updated})
    } 

    const formDataToObject = (fd:FormData) => {
      const obj: Record<string,any> = {}
      for (let key of fd.keys()) {
        const values = fd.getAll(key)
        obj[key] = values.length > 1 ? values : values[0]
      }
      return obj
    }
  
    const handleDelete = (id:string) => {
    setItems((prev)=>
      prev.filter((item) => item.id !== id)
    )}

    const queriedResults = useMemo(() => {
      return items
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }, [items,search]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const { name , value } = e.target;
      setProduct({...product, [name] : name === "price" ? Number(value) : value });
    }

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      Feat.forEach((feature,index) => 
        formData.append(`features`, feature)
      );
      product.images.forEach((img) => {
        formData.append("images", img)
      })
      colors?.forEach((color) => {
        formData.append("colors", color)
      })
      formData.append("dimensions", JSON.stringify({ width: product.dimensions.width, height: product.dimensions.height }));
      const stock = Number(formData.get("stock"))
      if (stock > 0 ) {
        formData.append("status", "In Stock")
        setProduct({...product, status:"In Stock"})
      } else {
        formData.append("status", "Out Of Stock");
        setProduct({...product, status:"Out Of Stock"})
      }

      for (let [key, value] of formData.entries()) {
        console.log(key,":",value);
      }
      const data = formDataToObject(formData)
      console.log("All data:", data);
      console.log("All data part 2:", product);
      setItems((prev) => [...prev, product])
      setProduct({
      name:"",
      category:"",
      stock:"",
      price:"",
      description:"",
      images:[],
      features:[],
      dimensions:{
        width:"",
        height:"",
      },
      colors:[],
      status:"",
      })
      setColors([])
      setFeat([])
      setOpen(false)
    }

    const handleSelectChange = (value : string) => {
      setProduct( prev => ({...prev, category:value}) )
    }
    const convert = () => {
    product.stock === "0" ? setProduct({...product, status:"Out Of Stock"}) : setProduct({...product, status:"In Stock"})
    } 
    const handleColorChange = () => {
      if (color && !colors?.includes(color)) {
      setProduct({ ...product, colors:[color]  })
      setColors((prev) => [...prev, color]);
      setColor("");
      }
    }
  
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files) {
        setProduct({ ...product, images: files })
      }
    }
  
    const removeImage = (index:number) => {
      const updated = product.images.filter((_, idx) => idx !== index);
      setProduct({...product, images:updated});
    };

    const categoryFilter = (arr:product[], categoryKey = "category") => {
      const seen = new Set();
      return arr.filter((obj:any) => {
        const categoryVal = obj[categoryKey];
        if (seen.has(categoryVal)) return false; 
        seen.add(categoryVal);
        return true
      });
    };
    
  return (
    <Card className='max-h-[60dvh]'>
      <CardHeader className='flex justify-between'>
        <div>
          <CardTitle className='headFont mb-3'>Product Inventory</CardTitle>
          <p>Manage your product catalog and inventory</p>
        </div>
        <div className='flex not-sm:flex-col gap-3'>
          <Button variant="outline"> <ArrowUpRightSquare /> Reset Products</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary"  className='bg-blue-300 text-black'><PlusCircle /> Add Product</Button>
            </DialogTrigger>
            <DialogContent className='max-h-[70dvh] overflow-y-scroll'>
              <form onSubmit={handleFormSubmit}>
                <DialogHeader>
                  <DialogTitle className='headFont text-3xl'> Create a Product</DialogTitle>
                  <DialogDescription> Showcase Your Merchandise</DialogDescription>
                </DialogHeader>
                <div className='grid gap-5 my-5'>
                  <div className='grid grid-cols-2 gap-5'>
                    <div className='grid gap-3'>
                      <Label htmlFor='product-name'>Product Name*</Label>
                      <Input id='product-name' name='name' value={product.name} onChange={handleChange} placeholder="Enter product name" required/>
                    </div>
                    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-category'>Product Category*</Label>
                      <Select name='category' onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categoryFilter(products).map((data:product,index:number)=> (
                              <SelectItem key={index} value={data.category}>
                                {data.category}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-price'>Price*</Label>
                      <Input id='product-price' type="number" name='price' value={product.price} onChange={handleChange} placeholder='$' required/>
                    </div>
    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-quantity'>Stock Quantity*</Label>
                      <Input id='product-quantity' type="number" name='stock' value={product.stock}
                       onChange={ (e) => 
                          (handleChange(e),convert)
                        } 
                        placeholder='0' required/>
                    </div>
                  </div>
                  <div className='w-full space-y-5'>
                    <div className='grid gap-3'>
                      <Label htmlFor='product-description'>Description*</Label>
                      <Textarea id='product-description' name='description' value={product.description} onChange={handleChange} placeholder='Product description' required/>
                    </div>
    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-image'>Add Photo*</Label>
                      <Input id='product-image' multiple onChange={handleFileChange}  type="file" name='image'/>
                      <div className='flex gap-3'>
                        {product.images.map((img,index) => 
                          <div key={index}>
                            {typeof img === "string" ? (
                              <div className='relative'>
                                <img className='w-[120px] h-[100px] mt-2' src={img} alt='preview-img' />
                                <Button className='rounded-full absolute -top-3 -right-3 p-1' onClick={() => removeImage(index)} variant="destructive"> <X /> </Button>
                              </div>
                            ):(
                              <div className='relative'>
                                <img className='w-[120px] h-[100px] mt-2' src={URL.createObjectURL(img)} alt='new-upload' />
                                <Button className='rounded-full absolute -top-3 -right-3 p-1' onClick={() => removeImage(index)} variant="destructive"> <X /> </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      </div>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <div className='grid gap-3'>
                      <Label htmlFor='product-feature'>Product Feature(optional)</Label>
                      {Feat.length > 0 && Feat.map((feature,index) => (
                        <div key={index} className='flex gap-3'>
                          <Input id='product-feature' value={feature} onChange={(e)=> modifyFeatures(index, e.target.value)} name='feature' placeholder={`Product feature ${index + 1}`}/>
                          <Button onClick={() => decreaseFeatures(index)}> <X /> </Button>
                        </div>
                      ))}
                      <p onClick={increaseFeatures} className='text-blue-400 hover:cursor-pointer text-sm'>+ Add Feature</p>
                    </div>
                    
                  </div>
                  <div className='grid grid-cols-3 gap-5'>
                    <div className='grid gap-3'>  
                      <Label htmlFor='product-width'>Width</Label>
                      <Input id='product-width' value={product.dimensions.width} onChange={
                        (e) => ( setProduct({...product, dimensions : { ...product.dimensions, width : e.target.value} }))
                      } 
                      name='dimensions.width' placeholder='Width'/>
                    </div>
    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-height'>Height</Label>
                      <Input id='product-height' value={product.dimensions.height} onChange={
                        (e) => ( setProduct({...product, dimensions : { ...product.dimensions, height : e.target.value} }))
                      } name='dimensions.height' placeholder='height'/>
                    </div>
    
                  </div>
                  <div className=''>
                    <div className='grid gap-3'>
                      <Label htmlFor='product-colors'>Color</Label>
                      <div className='flex w-full gap-5'>
                        <Input id='product-colors' name='colors' value={color} onChange={(e) => setColor(e.target.value)} placeholder='Add color'/>
                        <Button type="button" onClick={handleColorChange} variant="outline">Add Color</Button>
                      </div>
                    </div>
                    <div className='mt-5'>
                      {colors.length > 0 && colors?.map((color,index)=> (
                        <Badge key={index} className='mx-1 p-3' variant="outline">{color}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit"> Add Product</Button>
                </DialogFooter>
                </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className='overflow-x-scroll'>
        <div className='md:w-1/4 w-1/2'>
          <Input
           type='search'
           placeholder='Search...' 
           value={search}
           onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
        {items.length < 1 ? (
          <p className='text-center headFont text-3xl'>
            No Products Available
          </p>
        ):(
          <table className='not-md:w-[150dvw] w-full not-sm:text-sm'>
            <thead>
              <tr className=''>
                <th className=' p-4 text-start border-0 border-b'>Name</th>
                <th className=' py-2 text-start border-0 border-b'>Category</th>
                <th className=' py-2 text-start border-0 border-b'>Price</th>
                <th className=' py-2 text-start border-0 border-b'>Stock</th>
                <th className=' py-2 border-0 border-b'>Status</th>
                <th className=' py-2 border-0 border-b'>Actions</th>
              </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
              {queriedResults.length > 0 && (
                queriedResults.map((data:product,index)=> (
                  <ProductTable Product={data} setItems={setItems} onDelete={handleDelete} key={index}/>
                ))
              )}
            </tbody>
          </table>
        )}
        {queriedResults.length < 1 && (
          <div className='text-center mt-5 headFont text-3xl'>
            Product Not Found
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default Products;