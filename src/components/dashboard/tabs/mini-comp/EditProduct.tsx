import { Button } from '@/components/ui/button'
import { Edit, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { SetStateAction, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { editProduct } from '@/lib/actions'
import { toast } from 'sonner'
import { INTERIOR_CATEGORIES } from '@/components/constants'
import { Switch } from '@/components/ui/switch'
import DateTimePicker from '@/components/shop/Mini-Components/DatePicker'
import { product } from '@/components/shop/Mini-Components/CollectionCard'

type ExistingImage = {
  url: string
  public_id: string
}

const EditProduct = ({
  form,
  setForm,
}: {
  form: product
  setForm: React.Dispatch<SetStateAction<product>>
}) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [Feat, setFeat] = useState(form.features)
  const [colors, setColors] = useState(form.colors)
  const [color, setColor] = useState('')

  const [newImages, setNewImages] = useState<File[]>([])

  const [width, setWidth] = useState(form.dimensions?.width || '')
  const [height, setHeight] = useState(form.dimensions?.height || '')

  const increaseFeatures = () => {
    setFeat(prev => [...prev, ''])
  }

  const decreaseFeatures = (index: number) => {
    setFeat(prev => prev.filter((_, idx) => idx !== index))
  }

  const modifyFeatures = (index: number, value: string) => {
    const updated = [...Feat]
    updated[index] = value
    setFeat(updated)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setNewImages(prev => [...prev, ...Array.from(e.target.files)])
  }

  const removeExistingImage = (index: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }))
  }

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, idx) => idx !== index))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('category', form.category)
    formData.append('description', form.description)
    formData.append('price', form.price.toString())

    Feat.forEach(feature => formData.append('features', feature))
    colors?.forEach(c => formData.append('colors', c))

    formData.append(
      'dimensions',
      JSON.stringify({ width, height })
    )

    newImages.forEach(file => {
      formData.append('images', file)
    })

    formData.append(
      'existingImages',
      JSON.stringify(
        (form.images as ExistingImage[]).map(img => img.public_id)
      )
    )

    try {
      const update = await editProduct(
        `/products/${form._id}`,
        formData
      )

      if (update?.error) {
        toast.error(update.error)
      } else {
        toast.success('Product updated successfully!')
        setOpen(false)
      }
    } catch (error) {
      toast.error('Failed to update product')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setForm(prev => ({ ...prev, category: value }))
  }

  const handleColorChange = () => {
    if (color && !colors?.includes(color)) {
      setColors(prev => [...prev, color])
      setColor('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-blue-500 hover:text-white">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[70dvh] overflow-y-scroll">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle className="headFont text-3xl">
              Edit Product
            </DialogTitle>
            <DialogDescription>
              Modify Your Merchandise
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 my-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid gap-3">
                <Label htmlFor="product-name">Product Name*</Label>
                <Input
                  id="product-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="product-category">
                  Product Category*
                </Label>
                <Select
                  value={form.category}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {INTERIOR_CATEGORIES.map((data, index) => (
                        <SelectItem
                          key={index}
                          value={data.category}
                        >
                          {data.category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="product-price">Price*</Label>
                <Input
                  id="product-price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Description*</Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={200}
                required
              />
            </div>

            <div className="grid gap-3">
              <Label>Add Photo*</Label>
              <Input multiple type="file" onChange={handleFileChange} />

              <div className="flex gap-3 flex-wrap">
                {(form.images as ExistingImage[]).map(
                  (img, index) => (
                    <div key={img.public_id} className="relative">
                      <img
                        src={img.url}
                        className="w-[120px] h-[100px] mt-2"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        className="absolute -top-3 -right-3 p-1"
                        onClick={() =>
                          removeExistingImage(index)
                        }
                      >
                        <X />
                      </Button>
                    </div>
                  )
                )}

                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-[120px] h-[100px] mt-2"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      className="absolute -top-3 -right-3 p-1"
                      onClick={() => removeNewImage(index)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Product Features</Label>
              {Feat.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    value={feature}
                    onChange={e =>
                      modifyFeatures(index, e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => decreaseFeatures(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <p
                onClick={increaseFeatures}
                className="text-blue-400 text-sm cursor-pointer"
              >
                + Add Feature
              </p>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <Input
                placeholder="Width"
                value={width}
                onChange={e => setWidth(e.target.value)}
              />
              <Input
                placeholder="Height"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
            </div>

            <div>
              <div className="flex gap-5">
                <Input
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  placeholder="Add color"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleColorChange}
                >
                  Add Color
                </Button>
              </div>

              <div className="mt-3">
                {colors?.map((c, i) => (
                  <Badge key={i} className="mx-1">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-5 mb-6">
            <Switch
              checked={form.isDiscountDeal}
              onCheckedChange={v =>
                setForm(prev => ({
                  ...prev,
                  isDiscountDeal: v,
                }))
              }
            />
            <Switch
              checked={form.isXmasDeal}
              onCheckedChange={v =>
                setForm(prev => ({ ...prev, isXmasDeal: v }))
              }
            />
          </div>

          <DateTimePicker
            value={form.discountUntil}
            onChange={(iso: string) =>
              setForm(prev => ({
                ...prev,
                discountUntil: iso,
              }))
            }
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? 'Editing Product...' : 'Edit Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProduct

