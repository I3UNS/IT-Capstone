import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-screen md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
        <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
            <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
                Your Favorite Books <br /> All In One Place
            </h1>
            <p className="mt-4 text-xl text-zinc-300 text-center lg:text-start">
                Enrich your knowledge, discover intriguing stories and cultivate inspirations in our curated library of books
            </p>
            <div className='mt-8'>
                <Link
                    to="/books" 
                    className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-4 hover:bg-zinc-800 rounded-full">Browse Books
                </Link>
            </div>
        </div>

        <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
            <img 
                className="rounded-4xl h-[85%]"
                src="./hero.jpg" 
                alt="Hero: Photo by Iñaki del Olmo on Unsplash" 
            />
        </div>
    </div>
  )
}

export default Hero