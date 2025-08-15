"use client"

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <main className="min-h-dvh bg-white dark:bg-stone-950">
      <div className="text-center">
        <img
          src="/images/cream-couche.jpg"
          alt="Cozy interior with an armchair and lamp"
          className="object-cover relative h-screen w-screen bg-stone-50 dark:bg-stone-900"
        />
        <div className='abs-center'>
          <h1 data-error className="text-3xl font-bold headFont text-stone-900 dark:text-stone-100">Something went wrong</h1>
          <p className="mt-3">
            Our design team is rearranging things. Please try again.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button onClick={reset} className="bg-[#ed9e59] hover:bg-amber-700 text-white">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        {error?.digest ? (
          <p className="mt-4 text-xs">Error ID: {error.digest}</p>
        ) : null}
        </div>
      </div>
    </main>
  )
}

