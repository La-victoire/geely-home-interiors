"use client"
import { X } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const SearchFormReset = ({clearInput}:any) => {


  return (
    <div>
      <button type='reset' onClick={clearInput}>
        <p className='text-white search-btn'>
        <X className='size-5'/>
        </p>
      </button>
    </div>
  )
}

export default SearchFormReset