import React from 'react'
import { Link } from 'react-router-dom'
import { GoBookmarkSlash } from "react-icons/go";
import axios from 'axios';

const BookCard = ({data, wishlist}) => {

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/delete-book-from-wishlist",
      {},
      { headers }
    );
    alert(response.data.message);
    
  }

  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
        <Link to={`/book-details/${data._id}`}>
            <div className='text-white'>
                <div className='rounded flex items-center justify-center'>
                    <img src={data.url} alt="/" className='h-[25vh] border-b-6 border-l-4 rounded border-emerald-600'/>
                </div>
                <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
                <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
                <p className='mt-2 text-zinc-400 font-semibold text-xl'>${data.price}</p>
            </div>
        </Link>
        {wishlist && (
          <button 
            className='w-full bg-red-400 text-2xl px-4 py-2 rounded text-black hover:bg-white'
            onClick={handleRemoveBook}
          >
            <GoBookmarkSlash className='w-full'/>
          </button>
        )}
    </div>
  )
}

export default BookCard