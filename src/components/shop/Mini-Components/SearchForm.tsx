import React, { useState } from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'
import SearchFormReset from './SearchFormReset'

const SearchForm = ({query, setQuery, updateParams}:any) => {
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = () => {
    updateParams({ search: searchInput, page: 1});
  };

  return (
    <div className='search-form'>
      <input 
      name='query'
      value={searchInput}
      className='search-input text-black/50'
      placeholder='Search Products'
      onChange={(e) => setSearchInput(e.target.value)}
      />
      <div className='flex gap-2'>
        {query && <SearchFormReset clearInput={() => setQuery("")}/>}
        <button onClick={handleSearch} className='search-btn text-white'>
          <Search className='size-5'/>
        </button>
      </div>
    </div>
  )
}

export default SearchForm