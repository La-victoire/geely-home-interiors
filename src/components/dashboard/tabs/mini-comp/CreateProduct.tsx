import { Button } from '@/components/ui/button'
import { ArrowUpRightSquare, PlusCircle, X } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import DateTimePicker from '@/components/shop/Mini-Components/DatePicker'
import React, { SetStateAction, useState } from 'react'
import { INTERIOR_CATEGORIES } from '@/components/constants'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'sonner'
import { postData } from '@/lib/actions'
import { product } from '@/components/shop/Mini-Components/CollectionCard'

const CreateProduct = ({items, setItems}:{items:product[], setItems:React.Dispatch<SetStateAction<product[]>>}) => {
  const isMobile = useMediaQuery({maxWidth: 450 });
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [color, setColor] = useState<string>("");
  const [Feat, setFeat] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    name:"",
    category:"",
    subCategory:"",
    price:"",
    description:"",
    images:[],
    features:Feat,
    isXmasDeal: false,
    isDiscountDeal: false,
    discountUntil: "",
    dimensions:{
      width:"",
      height:"",
    },
    colors:colors,
  });

     const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const { name , value } = e.target;
      setProduct({...product, [name] : value });
    }

    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true)
      // Prepare form data
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("subCategory", product.subCategory);
      formData.append("isDiscountDeal", product.isDiscountDeal as unknown as string);
      formData.append("isXmasDeal", product.isXmasDeal as any);
      formData.append("discountUntil", product.discountUntil);
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

      // API call to create a product
      try {
        const createProduct = async () => {
          const response = await postData("/products", formData);
          if (response) {
            toast.success("Product created successfully!")
            console.log(response)
            setIsLoading(false)
          } 
        }
        createProduct();
      } catch (error) {
        console.error(error)
        toast.error("Failed to create product. Please try again.")
        setIsLoading(false)
      }
      // Update local state with the new product
      setItems((prev:any) => [...prev, product])
      setProduct({
      name:"",
      category:"",
      subCategory:"",
      price:"",
      description:"",
      images:[],
      features:[],
      isXmasDeal: false,
      isDiscountDeal: false,
      discountUntil: "",
      dimensions:{
        width:"",
        height:"",
      },
      colors:[],
      })
      setColors([])
      setFeat([])
      setOpen(false)
    }

    const handleSelectChange = (value : string) => {
      setProduct( prev => ({...prev, category:value}) )
    }

    const handleSubCategory = (value: string) => {
      setProduct(prev => ({...prev, subCategory:value}))    
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

    const groupSubCategories = (data:any) => {
        const grouped: Record<string, string[]> = {};

        for (const item of data) {
            if (!grouped[item.category]) {
                grouped[item.category] = new Set();
}
        for (const sub of item.subcategories) {
        grouped[item.category].add(sub.trim());
}
}

        for (const cat in grouped) {
            grouped[cat] = [...grouped[cat]];
}
        return grouped;
}
    
    const grouped = groupSubCategories(INTERIOR_CATEGORIES);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary"  className='bg-blue-300 text-black'><PlusCircle /> {!isMobile && "Add Product"} </Button>
            </DialogTrigger>
            <DialogContent className='max-h-[70dvh]  overflow-y-scroll'>
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
                      <Label htmlFor='product-category'>Product subcategory*</Label>
                      <Select name='sub-category' onValueChange={handleSubCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcat..."/>
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(grouped).map(([category, subs])=> (
                          <SelectGroup key={category}>
                            <SelectLabel>{category}</SelectLabel>
                            {subs.map((sub,index) => (
                              <SelectItem key={`${category}-${sub}`} value={sub}>
                                {sub}
                              </SelectItem>
))}
                          </SelectGroup>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
    
                    <div className='grid gap-3'>
                      <Label htmlFor='product-price'>Price*</Label>
                      <Input id='product-price' type="number" name='price' value={product.price} onChange={handleChange} placeholder='₦' required/>
                    </div>
    
                  </div>
                  <div className='w-full space-y-5'>
                    <div className='grid gap-3'>
                      <Label htmlFor='product-description'>Description*</Label>
                      <Textarea id='product-description' name='description' value={product.description} maxLength={200} onChange={handleChange} placeholder='Product description' required/>
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
                  <div className='grid grid-cols-1 gap-5'>
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
                  <div className='grid grid-cols-2 gap-5'>
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
   
                <div className="flex gap-5 mb-10">
                  <div className="flex gap-3 p-3 border rounded-md">
                      <Label className="text-sm font-medium">
                          Discount Deal
                      </Label>        
                      <Switch
                        id="isDiscountDeal"
                        checked={product.isDiscountDeal}
                        onCheckedChange={(value) =>
                          setProduct(prev => ({ ...prev, isDiscountDeal: value }))
                        }
                      />     
                  </div>

                  <div className="flex gap-3 p-3 border rounded-md">
                      <Label className="text-sm font-medium">
                          Christmas Deal
                      </Label>        
                      <Switch
                        id="isXmasDeal"
                        checked={product.isXmasDeal}
                        onCheckedChange={(value) =>
                          setProduct(prev => ({ ...prev, isXmasDeal: value }))
                        }
                      />     
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium">Discount Until</label>

                  <DateTimePicker 
                  value={product.discountUntil} 
                  onChange={(iso:string) =>
                            setProduct(prev => ({
                              ...prev,
                              discountUntil: iso
                            }))} />
                </div>

                <DialogFooter className="mt-10">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button disabled={isLoading} type="submit">{isLoading ? "Creating Product... " : "Add Product"}</Button>
                </DialogFooter>
                </form>
            </DialogContent>
    </Dialog>
  )
}

export default CreateProduct
