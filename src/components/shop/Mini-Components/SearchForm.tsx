import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'
import SearchFormReset from './SearchFormReset'
const SearchForm = ({query , setQuery}) => {
  
  return (
    <div className='search-form'>
      <input 
      name='query'
      value={query}
      className='search-input text-black/50'
      placeholder='Search Products'
      onChange={(e) => setQuery(e.target.value)}
      />
      <div className='flex gap-2'>
        {query && <SearchFormReset clearInput={() => setQuery("")}/>}
      </div>
    </div>
  )
}

export default SearchForm