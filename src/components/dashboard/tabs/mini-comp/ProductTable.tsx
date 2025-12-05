"use client"
import { product } from '@/components/shop/Mini-Components/CollectionCard'
import { Button } from '@/components/ui/button'
import { Edit, Loader2Icon, Trash2, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { editProduct } from '@/lib/actions'
import { toast } from 'sonner'
import { INTERIOR_CATEGORIES } from '@/components/constants'

const ProductTable = ({Product, onDelete}:{Product:product ,onDelete: (id:string) => void}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [form , setForm] = useState(Product);
  const [Feat, setFeat] = useState(form.features);
  const [colors, setColors] = useState(form.colors);
  const [color, setColor] = useState<string>("");
  const [images, setImages] = useState<any>(form.images)
  const [width, setWidth] = useState<string>(form.dimensions?.width);
  const [height, setHeight] = useState<string>(form.dimensions?.height);
  const increaseFeatures = () => {
    setFeat((prev) => [...prev, ""])
  }

  const decreaseFeatures = (index:number) => {
    const updated = Feat.filter((_,idx) => idx !== index)
    setFeat(updated)
  }

  const modifyFeatures = (index:number, value:string) => {
    const updated = [...Feat];
    updated[index] = value;
    setFeat(updated);
  } 
    
  const handleFormSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());
    Feat.forEach((feature,index) => 
      formData.append(`features`, feature)
    );
    form.images.forEach((img) => {
      formData.append("images", img.url)
    })
    colors?.forEach((color) => {
      formData.append("colors", color)
    })
     formData.append("dimensions", JSON.stringify({ width: width, height: height }));
    if (form.stock > 0 ) {
      formData.append("status", "In Stock")
    } else {
      formData.append("status", "Out Of Stock");
    }
    for (let [key, value] of formData.entries()) {
      console.log(key,":",value);
    }
    console.log("All images:",formData.getAll("colors"));

    // update product api call
    try {
      setTimeout( async () => {
        const update = await editProduct(`/products/${form._id}`, formData);
        console.log(update)
        if (update) {
          toast.success("Product updated successfully!")
          setIsLoading(false)
        } else if (update?.error) {
          toast.error(update.error)
          setIsLoading(false)
        }
        setOpen(false)
      }, 3000);
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      toast.error(`${error} Failed to update product. Please try again.`)
    }
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target;
    setForm({...form, [name] : value });
  }

  const handleSelectChange = (value : string) => {
    setForm( prev => ({...prev, category:value}) )
  }

  const handleColorChange = () => {
    if (color && !colors?.includes(color)) {
    setColors((prev) => [...prev, color]);
    setColor("");
    }
  }

  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImages(files)
    if (files) {
      setForm({ ...form, images: images })
    }
  }

  const removeImage = (index:number) => {
    const updated = form.images.filter((_, idx) => idx !== index);
    setForm({...form, images:updated});
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
    <tr className='border-0 border-b'>
      <td className='pl-3'>{form.name}</td>
      <td className=''>{form.category}</td>
      <td className=''>₦{form.price}</td>
      <td className=' flex flex-center py-3 space-x-3'>
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className='hover:bg-blue-500 hover:text-white'><Edit /></Button>
        </DialogTrigger>
          <DialogContent className='max-h-[70dvh] overflow-y-scroll'>
          <form onSubmit={handleFormSubmit}>
            <DialogHeader>
              <DialogTitle className='headFont text-3xl'> Edit Product</DialogTitle>
              <DialogDescription> Modify Your Merchandise</DialogDescription>
            </DialogHeader>
            <div className='grid gap-5 my-5'>
              <div className='grid grid-cols-2 gap-5'>
                <div className='grid gap-3'>
                  <Label htmlFor='product-name'>Product Name*</Label>
                  <Input id='product-name' name='name' value={form.name} onChange={handleChange} placeholder="Enter product name" required/>
                </div>
                
                <div className='grid gap-3'>
                  <Label htmlFor='product-category'>Product Category*</Label>
                  <Select name='category' value={form.category} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder={form.category ? form.category : "Select a category"}/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {INTERIOR_CATEGORIES.map((data,index)=> (
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
                  <Input id='product-price' type="number" name='price' value={form.price} onChange={handleChange} placeholder='₦' required/>
                </div>

              </div>
              <div className='w-full space-y-5'>
                <div className='grid gap-3'>
                  <Label htmlFor='product-description'>Description*</Label>
                  <Textarea id='product-description' name='description' maxLength={200} value={form.description} onChange={handleChange} placeholder='Product description' required/>
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='product-image'>Add Photo*</Label>
                  <Input id='product-image' multiple onChange={handleFileChange}  type="file" name='image'/>
                  <div className='flex gap-3'>
                    {form.images.map((img,index) => 
                      <div key={index}>
                        {typeof img.url === "string" ? (
                          <div className='relative'>
                            <img className='w-[120px] h-[100px] mt-2' src={img.url} alt='preview-img' />
                            <Button type='button' className='rounded-full absolute -top-3 -right-3 p-1' onClick={() => removeImage(index)} variant="destructive"> <X /> </Button>
                          </div>
                        ):(
                          <div className='relative'>
                            <img className='w-[120px] h-[100px] mt-2' src={URL.createObjectURL(img)} alt='new-upload' />
                            <Button type='button' className='rounded-full absolute -top-3 -right-3 p-1' onClick={() => removeImage(index)} variant="destructive"> <X /> </Button>
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
                    <div className='flex gap-3'>
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
                  <Input id='product-width' value={width} onChange={(e) => setWidth(e.target.value)} name='dimensions.width' placeholder='Width'/>
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='product-height'>Height</Label>
                  <Input id='product-height' value={height} onChange={(e) => setHeight(e.target.value)} name='dimensions.height' placeholder='height'/>
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
                  {colors?.length > 0 && colors?.map((color,index)=> (
                    <Badge key={index} className='mx-1 p-3' variant="outline">{color}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit"> {isLoading ? `Editing Product...` : "Edit Product"}</Button>
            </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
