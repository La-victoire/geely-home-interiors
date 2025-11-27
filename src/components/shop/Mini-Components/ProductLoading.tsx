"use client"

import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { useMediaQuery } from "react-responsive"

const ProductHeroSkeleton = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 })

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-col-reverse gap-5">
          {/* MOBILE RIGHT SIDE – MAIN IMAGE */}
          <div className="rounded-xl h-[90dvh] bg-black/10 overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* MOBILE LEFT SIDE */}
          <div>
            <Skeleton className="w-28 h-10 mb-4 rounded-lg" />

            <div className="flex flex-col gap-5">
              <Skeleton className="w-3/4 h-14 rounded-lg" />

              {/* Thumbnails carousel */}
              <div className="flex gap-3">
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
              </div>

              {/* Price + Status */}
              <div className="flex justify-between items-end">
                <Skeleton className="w-24 h-10 rounded-lg" />
                <Skeleton className="w-20 h-6 rounded-lg" />
              </div>

              <Skeleton className="w-full h-20 rounded-lg" />

              {/* Buttons */}
              <div className="flex gap-5">
                <Skeleton className="w-36 h-12 rounded-xl" />
                <Skeleton className="w-36 h-12 rounded-xl" />
              </div>

              {/* Quantity */}
              <div className="flex gap-3 mt-3 items-center">
                <Skeleton className="w-20 h-8 rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // DESKTOP
        <div className="flex gap-5">
          {/* LEFT SIDE */}
          <div className="w-1/2">
            <Skeleton className="w-28 h-10 mb-4 rounded-lg" />

            <div className="flex flex-col gap-5">
              <Skeleton className="w-2/3 h-14 rounded-lg" />

              {/* Thumbnails carousel */}
              <div className="flex gap-3 flex-row-reverse">
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
                <Skeleton className="w-[110px] h-[100px] rounded-2xl" />
              </div>

              {/* Price + Status */}
              <div className="flex gap-5 items-end">
                <Skeleton className="w-24 h-10 rounded-lg" />
                <Skeleton className="w-20 h-6 rounded-lg" />
              </div>

              <Skeleton className="w-[30dvw] h-24 rounded-lg" />

              <div className="flex gap-5">
                <Skeleton className="w-40 h-12 rounded-xl" />
                <Skeleton className="w-40 h-12 rounded-xl" />
              </div>

              <div className="flex gap-3 mt-3 items-center">
                <Skeleton className="w-20 h-8 rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – MAIN IMAGE */}
          <div className="w-1/2 rounded-2xl bg-black/10 h-[90dvh] overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductHeroSkeleton
