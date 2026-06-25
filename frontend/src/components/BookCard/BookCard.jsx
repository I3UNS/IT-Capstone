import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({data}) => {
  return (
    <>
        <Link>
            <div className='bg-zinc-800 rounded p-4 flex flex-col text-white'>
                <div className='rounded flex items-center justify-center'>
                    <img src={data.url} alt="/" className='h-[25vh] border-b-6 border-l-4 rounded border-emerald-600'/>
                </div>
                <h2 className='mt-4 text-xl font-semibold'>{data.title}</h2>
                <p className='mt-2 text-zinc-400 font-semibold'>{data.author}</p>
                <p className='mt-2 text-zinc-400 font-semibold text-xl'>${data.price}</p>
            </div>
        </Link>
    </>
  )
}

export default BookCard