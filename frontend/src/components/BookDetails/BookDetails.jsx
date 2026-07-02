import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { CiBookmark } from "react-icons/ci";
import { FaCartShopping, FaDeleteLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const BookDetails = () => {
    const { id } = useParams();    
    const [Book, setBook] = useState();
    const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    
  useEffect(() => {
    const fetch = async() => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );      
      setBook(response.data.data);
    };    
    fetch();
  }, []);

  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleWishlist = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/add-book-to-wishlist", 
      {}, 
      { headers }
    )
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/add-to-cart",
      {},
      { headers }
    )
    alert(response.data.message);
  };

  return (
    <>
        {Book && (
            <div className='px-6 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row items-center justify-center gap-8'>
                <div className='w-full lg:w-[30%]'>
                  <div className='bg-zinc-800 p-12 rounded flex items-center justify-around'>
                    <img 
                      src={Book.url} 
                      alt="/" 
                      className='h-[50vh] lg:h-[70vh] rounded'
                    />
                    {isUserLoggedIn === true && role ==="user" && (
                      <div className='flex flex-col gap-4 mb-[40%]'>
                        <button 
                          className='bg-white rounded-full text-3xl p-4 hover:text-green-600'
                          onClick={handleWishlist}
                        >
                          <CiBookmark />
                        </button>
                        <button 
                          className='group bg-white rounded-full text-3xl p-4 hover:text-green-600 mt-4'
                          onClick={handleCart}
                        >
                          <FaCartShopping /> 
                        </button>
                      </div>
                    )}

                    {isUserLoggedIn === true && role ==="admin" && (
                      <div className='flex flex-col gap-4 mb-[40%]'>
                        <button className='bg-white rounded-full text-3xl p-4 hover:text-green-600'>
                          <FaRegEdit />
                        </button>
                        <button className='group bg-white rounded-full text-3xl p-4 hover:text-green-600 mt-4'>
                          <MdDeleteOutline /> 
                        </button>
                      </div>
                    )}
                  </div>
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