"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center bg-white dark:bg-stone-950 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <img
          src="/images/not-found-bg.jpg"
          alt="A modern furniture set in a living room"
          className="mx-auto mb-8 rounded-lg border bg-stone-50 dark:bg-stone-900"
        />
        <h1 data-not-found className="text-4xl font-bold headFont tracking-tight text-stone-900 dark:text-stone-100">
          Are you lost?
        </h1>
        <p className="mt-3 text-stone-600 dark:text-stone-400">
          The page you’re looking for has been rearranged like our showrooms.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/"><Home className="mr-2 h-4 w-4" /> Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/shop/products"><Search className="mr-2 h-4 w-4" /> Browse Products</Link>
          </Button>
          <Button onClick={()=> history.back()} variant="ghost">
             Go Back
          </Button>
        </div>
      </div>
    </main>
  )
}

