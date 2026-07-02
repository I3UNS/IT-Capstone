import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


const MobileNav = () => {

  const role = useSelector((state) => state.auth.role );


  return (
    <>
        {role === "user" && (
            <div className='lg:hidden w-full flex items-center justify-between mt-4'>
        <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Wishlists
        </Link>
        <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Order History
        </Link>
        <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Settings
        </Link>
    </div>
        )}

        {role === "admin" && (
            <div className='lg:hidden w-full flex items-center justify-between mt-4'>
        <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Orders
        </Link>
        <Link
            to="/profile/add-book"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Add Book
        </Link>
        <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
            Settings
        </Link>
    </div>
        )}
    </>
  )
}

export default MobileNav