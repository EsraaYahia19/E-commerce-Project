import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authcontext } from '../../Context/Authcontext'
import { cartcontext } from '../../Context/Cartcontext'
import { wishcontext } from '../../Context/Wishlistcontext'


export default function Navbaar() {
    const {numOfcartItems}= useContext(cartcontext)
   const{numofitems}= useContext(wishcontext)
    let { token, setToken } = useContext(authcontext)
    let navigate = useNavigate()
    const [toggle, setToggle] = useState(null)
    const [hiddenele, setHiddenele] = useState("hidden")
    function openclose() {
        if (hiddenele == "hidden") {
            setHiddenele("block")
        } else {
            setHiddenele("hidden")

        }
    }

    function logout() {
        setToken(null)
        localStorage.removeItem("tkn")
        navigate("/login")
    }
    return (
        <>

            <nav className='bg-[#F8F9FA] fixed top-0 left-0 w-full p-3 md:p-4 z-50'>
                <div className='md:w-[85%] mx-auto lg:ps-0 md:ps-10'>
                    <div className='flex   items-start lg:items-center justify-between'>
                        <div className='flex  h-full items-center '>
                            <i className="fa-solid fa-cart-shopping text-[#4FA74F] text-[32px]"></i>

                            <Link to="">
                                <h1 className='text-lg md:text-[28px] font-[500]'>fresh cart</h1>

                            </Link>
                        </div>
                        <div className='  w-[65%] '>
                            <div className='lg:hidden flex justify-end mt-2  items-center' ><i onClick={openclose} className="cursor-pointer fa-solid fa-bars text-[32px]  "></i></div>
                            <div className={`${hiddenele}  lg:flex  justify-between`} >
                                <div className=''>
                                    {token ?
                                        <ul className='flex flex-col lg:flex-row h-full items-center space-x-3  '>
                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 pt-4'>
                                                <NavLink to="">Home</NavLink>

                                            </li>


                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 relative pt-2'>
                                                <NavLink to="wishlist">Wish list</NavLink>
                                                {numofitems>0?<div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -end-7 top-2 lg:-top-4 lg:-end-2 dark:border-gray-900">{numofitems}</div>:""}
                                                
                                            </li>

                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 pt-2'>
                                                <NavLink to="products">Products</NavLink>

                                            </li>
                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 pt-2'>
                                                <NavLink to="categories">Categories</NavLink>

                                            </li>
                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 pt-2'>
                                                <NavLink to="brands">Brands</NavLink>

                                            </li>
                                            <li className='text-gray-500 hover:text-black duration-500 lg:pt-0 pt-2'>
                                                <NavLink to="allorders">Allorders</NavLink>

                                            </li>


                                        </ul> : ""
                                    }

                                </div>
                                <div className='flex  h-full items-center flex-col lg:flex-row'>
                                    {token ?
                                        <div className='flex  h-full items-center flex-row lg:pt-0 pt-5 ' >

                                            <Link to="cart"> <span className='relative cursor-pointer'>
                                                <i className="  fa-solid fa-cart-shopping text-gray-600 hover:text-black duration-500 cursor-pointer text-[32px]"></i>
                                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-5 -end-2 dark:border-gray-900">{numOfcartItems}</div>
                                            </span></Link>
                                            <span onClick={logout} className='ms-4 text-gray-500  hover:text-black duration-500 cursor-pointer '> logout</span>
                                        </div> :
                                        <div className='flex  h-full items-center  ms-2 flex-col lg:flex-row lg:pt-0 pt-5 ' >
                                            <h3 className=' lg:pt-0 pt-2 text-gray-500 hover:text-black duration-500 '>  <NavLink to="register" >Register</NavLink></h3>
                                            <h3 className=' lg:pt-0 pt-4 lg:ms-4 text-gray-500 hover:text-black duration-500 '> <NavLink to="login">Login</NavLink></h3>
                                        </div>}



                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
