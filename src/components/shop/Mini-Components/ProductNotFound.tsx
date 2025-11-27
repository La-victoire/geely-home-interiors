"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, ArrowLeft } from "lucide-react"

const ProductNotFound = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      
      <div className="mb-6 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-[#ed9e59]" />
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-semibold mb-3 headFont">
        Product Not Found
      </h1>

      <p className="text-muted-foreground max-w-md mb-6">
        We couldn’t find the product you’re looking for.  
        It may have been removed, out of stock, or the link might be incorrect.
      </p>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>

        <Button className="bg-[#ed9e59] text-white" onClick={() => window.location.href = "/"}>
          Browse Collection
        </Button>
      </div>

      {/* Optional: Soft skeleton preview to guide the user's eyes */}
      <div className="mt-10 flex gap-3">
        <Skeleton className="w-32 h-44 rounded-xl" />
        <Skeleton className="w-32 h-44 rounded-xl" />
        <Skeleton className="w-32 h-44 rounded-xl" />
      </div>

    </div>
  )
}

export default ProductNotFound
