import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import { AiFillDelete } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const navigate = useNavigate();
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-user-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:3000/api/v1/delete-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0){
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart])

  const placeOrder = async () => {
    try {
      const response = await axios.post(
      "http://localhost:3000/api/v1/place-order",
      { order: Cart },
      { headers }
    );
    alert(response.data.message);
    navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    };
};
    
  
  return (
    <div className='bg-zinc-900 px-12 py-8 h-screen'>
      {!Cart && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {Cart && Cart.length === 0 && (
        <div className='h-screen bg-zinc-900'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
          </div>
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <div className='bg-zinc-900 p-4'>
          <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
            Your Cart
          </h1>

          {Cart.map((items, i) => (
            <div 
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
              key={i}
            >
              <img 
                src={items.url} 
                alt="/"
                className='h-[20vh] md:h-[10vh] object-cover' 
              />
              <div className='w-full ms-10'>
                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                  {items.title}
                </h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                  {items.desc.slice(0, 100)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                  {items.desc.slice(0, 65)}...
                </p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                  ${items.price}
                </h2>
                <button
                  className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12 me-4 scale-[150%]'
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        )}

        {Cart && Cart.length > 0 && (
          <div className='mt-4 w-full p-4 flex flex-col items-end justify-center'>
            <div className='p-4 bg-zinc-800 rounded'>
              <h1 className='text-3xl text-zinc-200 font-semibold'>
                Total Amount
              </h1>
            </div>
            <div className='mt-8 flex items-center justify-between text-xl text-zinc-200'>
              <h2 className='me-12'>{Cart.length} books</h2> 
              <h2 className='ms-12'>$ {Total}</h2>
            </div>
            <div className='w-[13%] mt-8'>
              <button 
                className='bg-zinc-100 rounded p-4 flex justify-center w-full font-semibold hover:bg-zinc-300 transition-all duration-300'
                onClick={placeOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        )}
    </div>
  )
}

export default Cart