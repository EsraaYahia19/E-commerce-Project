import React, { useContext } from 'react'
import { cartcontext } from '../../Context/Cartcontext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

  const { cartproducts, totalCartPrice, numOfcartItems, updateCart, deleteCart, clearCart } = useContext(cartcontext)

  function handleUpdateCount(id, newcount) {
    updateCart(id, newcount)
  }
  function handlechange(id, value) {
    if (value > 0) {

      updateCart(id, value)
    }

  }

  async function handledelete(id) {
    const resFlag = await deleteCart(id)

    if (resFlag) {
      toast.success("Product deleted successfully", {
        position: 'top-right',
        duration: 2000
      })
    } else {
      toast.error("'Fail' Try again", {
        position: 'top-right',
        duration: 2000
      })
    }
  }
  return (
    <>


      <div className='w-[85%] mx-auto bg-gray-100'>
        <div className=' sm:px-10 md:px-20  lg:px-10 xl:px-24 px-5 pb-28 ' >

          {cartproducts ?
            numOfcartItems === 0 ? <div className='text-[32px] font-extrabold flex items-center h-60 pt-20 justify-center '>
              <h2 className='text-red-600' >Your Cart is empty</h2>
            </div>
              : <>
                <h1 className='font-medium text-[32px] pt-10 pb-5'>Cart Shop</h1>
                <div className="classname flex justify-between">
                  <h2 className='font-medium text-[20px] pb-5 '>Total Price: <span className='text-green-500'>{totalCartPrice} </span>LE</h2>
                  <h2 className=' text-[18px] pb-5 '>Your cart includes <span className='text-red-500 font-medium'>{numOfcartItems} </span>different items</h2>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-16 py-3">
                          <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3 text-[18px] text-green-600">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-[18px] text-green-600">
                          Qty
                        </th>
                        <th scope="col" className="px-6 py-3 text-[18px] text-green-600">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-[18px] text-green-600">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartproducts.map((product) =>
                        <tr key={product._id} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="p-4">
                            <img src={product.product.imageCover} className="w-16 md:w-40 max-w-full max-h-full" alt={product.product.title} />
                          </td>
                          <td className="px-6 py-4 font-semibold   md:text-lg text-gray-900 dark:text-white">
                            {product.product.title}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <button disabled={product.count === 1} onClick={() => handleUpdateCount(product.product._id, product.count - 1)} className={`inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none ${product.count === 1 ? "" : "hover:bg-gray-100"}  focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`} type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                </svg>
                              </button>
                              <div>

                                <input type="number" onChange={(e) => {
                                  if (e.target.value > 0) {
                                    handlechange(product.product._id, e.target.value)
                                  } else {
                                    e.target.value = 1
                                  }
                                }} id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-1 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
                              </div>
                              <button onClick={() => handleUpdateCount(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {product.price} EGP
                          </td>
                          <td className="px-8 py-4 ">
                            <a href="#" onClick={() => handledelete(product.product._id)} className=" font-medium text-red-600 dark:text-red-500 hover:underline ">
                              <i className="fa-solid fa-trash-can text-[28px]"></i>
                            </a>
                          </td>
                        </tr>
                      )}


                    </tbody>
                  </table>
                  <div className='text-center'>
                    <button onClick={clearCart} className='text-white hover:bg-red-700 duration-500 bg-red-600 w-[50%] rounded-2xl py-5 mx-auto  my-10 ' type='button'>Clear Cart </button>
                  </div>
                  <div className='w-1/2 mx-auto'>
                    <div className='text-center flex justify-between'>
                   <Link to="/payment" className=' w-full   mb-10 '>  <button className='text-white hover:bg-green-700 duration-500 bg-green-600 rounded-xl w-full py-5' type='button'>Pay Now  </button></Link> 
                     
                    </div>
                  </div>
                </div> </> :
            <div className='text-[32px] font-extrabold flex items-center h-60 pt-20 justify-center '>
              <h2 className='text-red-600' >Your Cart is empty</h2>
            </div>


          }





        </div>
      </div>



    </>
  )
}
