import { Button } from '@/components/ui/button';
import React from 'react'

const slowDataFetch = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    message: "This page took 2s seconds to load!",
    timestamp: new Date().toISOString(),
  };
}

const page = async () => {

  const data = await slowDataFetch();
  return (
    <div className='h-screen w-screen'>
      <div className='abs-center flex items-center item-col'>
        <h1 className='headFont text-center text-5xl'>Slow Reading Test Success</h1>
        <div className='flex item-col items-center'>
          <p>{data.message}</p>
          <p>Loaded at : {data.timestamp}</p>
        </div>
      </div>
    </div>
  )
}

export default page