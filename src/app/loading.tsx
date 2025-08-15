import { Loader2, Star } from 'lucide-react'

export default function RootLoading() {
  return (
    <main className="h-screen bg-white dark:bg-stone-950">
        <img
          src="/images/white-bg.jpg"
          alt="Minimal interior silhouette"
          className="relative object-cover h-full min-w-full opacity-70"
        />
        <div className='abs-center flex flex-col items-center text-center'>
          <Star fill='true' className="h-20 w-20 animate-bounce text-black" aria-label="Loading" />
          <p data-loading className="mt-7 text-black text-3xl headFont">Designing your experience...</p>
        </div>
    </main>
  )
}

