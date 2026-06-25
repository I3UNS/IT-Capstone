import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

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
    <div className='bg-zinc-900 h-auto px-12 py-8'>
      <h4 className='text-3xl text-yellow-100'>Books</h4>
        {!Book && (
          <div className='flex items-center justify-center my-8 invert'>
            <Loader />{" "}
          </div>
        )}
        <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {Book && Book.map(
            ( items, i ) => 
              <div key={i}>
                <BookCard data={ items }/>{" "} 
              </div>
          )}
        </div>
    </div>
  )
}

export default Books