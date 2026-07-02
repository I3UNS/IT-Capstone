import React, { useState } from "react";
import { Link, Links } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";

const Navbar = () => {

    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "About Us",
            link: "/about-us",
        },
        {
            title: "Books",
            link: "/books",
        },
        {
            title: "Cart",
            link: "/cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "Admin Profile",
            link: "/profile",
        },
        
    ];

    const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn );
    const role = useSelector((state) => state.auth.role );
    
    if(isUserLoggedIn === false){
        links.splice(3,3);
    }
    if(isUserLoggedIn === true && role === "user"){
        links.splice(-1,1)        
    }
    if(isUserLoggedIn === true && role === "admin"){
        links.splice(-2,1)        
    }
    
    const [MobileNav, setMobileNav] = useState("hidden");

    return (
        <>
            <nav className="z-50 relative flex items-center justify-between bg-zinc-800 text-white px-8 py-4">
            <Link 
                to="/" 
                className="flex items-center">
                <img 
                    className="h-20 me-4 invert"
                    src="https://api.iconify.design/mdi:bookshelf.svg" 
                    alt="bookbazaar-logo"
                />
                <h1 className="text-2xl font-semibold">BookBazaar</h1>
            </Link>
            <div className="block md:flex gap-4 items-center nav-links-bookbazaar">
                <div className="hidden md:flex gap-4">
                    { links.map(( items, i ) => (
                        <div className="flex items-center justify-center">
                            {items.title === "Profile" || items.title === "Admin Profile" ? (
                                <Link 
                                    to={items.link}
                                    className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300" 
                                    key = {i}
                                >
                                    {items.title}{" "} 
                                </Link>
                        ) : (
                                <Link 
                                    to={items.link}
                                    className="hover:text-blue-500 transition-all duration-300" 
                                    key = {i}
                                >
                                    {items.title}{" "} 
                                </Link>
                        )}
                        </div>
                    ))}
                </div>
                {isUserLoggedIn === false && (
                    <>
                    <div className="hidden md:flex gap-4">
                        <Link 
                            to="/login" 
                            className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup" 
                            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                            Sign Up
                        </Link>
                    </div>
                    </>
                )}
                <button 
                    className="block md:hidden text-white text-2xl hover:text-zinc-400" 
                    onClick={() => 
                        MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
                }>
                    <GiHamburgerMenu />
                </button>
            </div>
            </nav>

            <div className={`${MobileNav} bg-zinc-800 h-screen absolute mt-14 top-0 left-0 px-10 w-full z-40 flex flex-col items-center justify-center`}>
                { links.map(( items, i ) => (
                        <Link to={items.link}
                            className="text-white text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300" 
                            key = {i}
                            onClick={() => 
                               MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden")
                            }
                        >
                            {items.title}{" "} 
                        </Link>
                        ))}
                    {isUserLoggedIn === false && (
                    <>
                    <Link 
                        to="/login" 
                        className="px-4 mb-8 py-2 text-white text-3xl font-semibold border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup" 
                        className="px-4 mb-8 py-2 text-white text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    >
                        Sign Up
                    </Link>
                    </>
                )}
            </div>
        </>
    );
};

export default Navbar;
