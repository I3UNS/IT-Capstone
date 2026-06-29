import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Loader/Loader';

const BookDetails = () => {
    const { id } = useParams();    
    const [Book, setBook] = useState();
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );      
      setBook(response.data.data);
    };    
    fetch();
  }, []);

  return (
    <>
        {Book && (
            <div className='px-6 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row items-center justify-center gap-8'>
                <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>
                    <img 
                        src={Book.url} 
                        alt="/" 
                        className='h-[50vh] lg:h-[70vh] rounded'
                    />
                </div>
                <div className='p-4 w-full lg:w-3/6'>
                    <h1 className='text-4xl text-zinc-300 font-semibold'>{Book.title}</h1>
                    <p className='text-zinc-400 mt-1'>by {Book.author}</p>
                    <p className='text-zinc-500 mt-4 text-xl'>{Book.desc}</p>
                    <p className='text-zinc-100 mt-4 text-3xl font-semibold'>${Book.price}</p>
                </div>
            </div>    
        )}
        {!Book && 
            <div className="h-screen bg-zinc-900 flex items-center justify-center">
                <Loader />{" "}
            </div>
        }
    </>
  )
}

export default BookDetails;