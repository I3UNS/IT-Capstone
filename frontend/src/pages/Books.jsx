import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import SearchFilter from '../components/SearchFilter/SearchFilter'

const Books = () => {
  const [Book, setBook] = useState();
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-books"
      );
      setBook(response.data.data);
    };    
    fetch();
  }, [])
  
  return (
    <div className='bg-zinc-900 h-screen px-12 py-8'>
      <div className='text-yellow-100 gap-10 flex'>
        <h4 className='mt-2 text-3xl'>Books</h4>
      </div>
        {!Book && (
          <div className='flex items-center justify-center my-8 invert'>
            <Loader />{" "}
          </div>
        )}
        {/* Input a div container with flex here. It will contain both filter and books within this div */}
        <div className='text-white flex flex-cols-2 gap-20'>
          <SearchFilter />

          <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {Book && Book.map(
              ( items, i ) => 
                <div key={i}>
                  <BookCard data={ items }/>{" "} 
                </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Books