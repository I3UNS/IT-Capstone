import axios from 'axios';
import React, { useState } from 'react'

const AddBook = () => {

    const [Book, setBook] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
    });

    const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setBook({...Book, [name]: value});
  };

  const submit = async () => {
    try {
        if(
            Book.url === "" ||
            Book.title === "" ||
            Book.author === "" ||
            Book.price === "" ||
            Book.desc === ""
        ){
            alert("All fields are required");
        } else {
            const response = await axios.post(
                "http://localhost:3000/api/v1/add-book",
                Book,
                { headers }
            );
            setBook({
                url: "",
                title: "",
                author: "",
                price: "",
                desc: "",
            });
            alert(response.data.message);
        };
    } catch (error){ 
        console.log(error);
    }
  };
  return (
    <div className='h-[100%] p-0 md:p-4'>
        <h1 className='text-2xl md:text-4xl font-semibold text-zinc-500 mb-8'>
            Add Book
        </h1>
        <div className='p-6 bg-zinc-800 rounded'>
            <div>
                <label htmlFor="" className='text-zinc-400'>
                    Image
                </label>
                <input 
                    type="text"
                    className='w-full mb-6 bg-zinc-900 text-zinc-100 p-2 outline-none' 
                    placeholder='Image url'
                    name="url" 
                    required
                    value={Book.url} 
                    onChange={change}
                />
            </div>
            <div>
                <label htmlFor="" className='text-zinc-400'>
                    Title
                </label>
                <input 
                    type="text"
                    className='w-full mb-6 bg-zinc-900 text-zinc-100 p-2 outline-none' 
                    placeholder='Title of the book'
                    name="title" 
                    required
                    value={Book.title} 
                    onChange={change}
                />
            </div>
            <div>
                <label htmlFor="" className='text-zinc-400'>
                    Author
                </label>
                <input 
                    type="text"
                    className='w-full mb-6 bg-zinc-900 text-zinc-100 p-2 outline-none' 
                    placeholder='Author of the book'
                    name="author" 
                    required
                    value={Book.author} 
                    onChange={change}
                />
            </div>
            <div>
                <label htmlFor="" className='text-zinc-400'>
                    Price
                </label>
                <input 
                    type="number"
                    className='w-full mb-6 bg-zinc-900 text-zinc-100 p-2 outline-none' 
                    placeholder='Price of the book'
                    name="price" 
                    required
                    value={Book.price} 
                    onChange={change}
                />
            </div>
            <div>
                <label htmlFor="" className='text-zinc-400'>
                    Description
                </label>
                <input 
                    type="text"
                    className='w-full mb-6 bg-zinc-900 text-zinc-100 p-2 outline-none' 
                    placeholder='Description of the book'
                    name="desc" 
                    required
                    value={Book.desc} 
                    onChange={change}
                />
            </div>
            <button
                className='mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300'
                onClick={submit}
            >
                Submit
            </button>
        </div>
    </div>
  )
}

export default AddBook