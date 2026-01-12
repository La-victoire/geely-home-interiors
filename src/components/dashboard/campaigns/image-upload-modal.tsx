"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"

interface ImageUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInsert: (imageUrl: string, altText: string) => void
}

export function ImageUploadModal({ open, onOpenChange, onInsert }: ImageUploadModalProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [altText, setAltText] = useState("")

  const mockImages = ["/premium-furniture-living-room.jpg", "/luxury-bedroom-design.jpg", "/modern-dining-table.png"]

  const handleInsert = () => {
    if (imageUrl) {
      onInsert(imageUrl, altText)
      setImageUrl("")
      setAltText("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Insert Image</DialogTitle>
          <DialogDescription>Choose an image or paste a URL</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to upload</p>
            <Input type="file" accept="image/*" className="hidden" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Image URL</label>
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Alt Text</label>
            <Input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe the image for accessibility"
            />
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Or choose from recent uploads:</p>
            <div className="grid grid-cols-3 gap-4">
              {mockImages.map((url, i) => (
                <img
                  key={i}
                  src={url || "/placeholder.svg"}
                  alt={`suggestion-${i}`}
                  className="w-full h-32 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-gold transition-all"
                  onClick={() => setImageUrl(url)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={!imageUrl}>
            Insert Image
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

