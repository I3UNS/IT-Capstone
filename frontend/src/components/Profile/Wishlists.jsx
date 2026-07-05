import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'

const Wishlists = () => {

  const [WishlistBook, setWishlistBook] = useState()

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-user-wishlist",  
        { headers }
      )
      setWishlistBook(response.data.data);
      
    };
    fetch();
  }, [WishlistBook]);
  
  return (
    <>
      {!WishlistBook && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
        {WishlistBook && WishlistBook.length === 0 && 
          <div className='text-5xl font-semibold h-[50%] text-zinc-400 flex items-center justify-center w-full'>
            Your wishlist will show up here
          </div>
        }
        
      <div className='grid grid-cols-4 gap-4'>
        {WishlistBook &&
          WishlistBook.map((items, i) => (
            <div key={i}>
              <BookCard data={items} wishlist={true} />
            </div>
          ))
        }
      </div>
    </>
    
  )
}

export default Wishlists