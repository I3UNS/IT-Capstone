import React from 'react'
import SearchBar from '../SearchBar/SearchBar'

const SearchFilter = () => {

    

  return (
    <div className='mt-4 mb-4'>
      <SearchBar />

      <h2 className='text-2xl mt-4 mb-4'>Filter by Categories</h2>
      <h2 className='text-xl mt-4 mb-4 underline underline-offset-3'>Genres</h2>
      <div className='flex flex-col'>
        <label className="flex space-between gap-2" htmlFor="">
          <input type="checkbox" name="action" id="action" />
           Action
        </label>
        
        <label className="flex space-between gap-2" htmlFor=""> 
          <input type="checkbox" name="adventure" id="adventure" />
          Adventure
        </label>
        <label className="flex space-between gap-2" htmlFor=""> 
          <input type="checkbox" name="drama" id="drama" />
          Drama
        </label>
        
        <label className="flex space-between gap-2" htmlFor="">
          <input type="checkbox" name="philosophy" id="philosophy" />
          Philosophy
        </label>

        <label className="flex space-between gap-2" htmlFor=""> 
          <input type="checkbox" name="fantasy" id="fantasy" />
          Fantasy
        </label>

      <h2 className='text-xl mt-4 mb-4 underline underline-offset-3'>Author</h2>
      
      </div>

    </div>
  )
}

export default SearchFilter