import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/images/slider-2.jpeg"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartcontext } from './../../Context/Cartcontext';
import toast from 'react-hot-toast'
import { wishcontext } from '../../Context/Wishlistcontext'
export default function Products() {

  const { addToWishlist, deleteProductwishlist } = useContext(wishcontext)
  // const [isclicked, setIsclicked] = useState(false)
  ////////////////////////
const [clickedProduct, setClickedProduct] = useState({})
  ////////////////////////
useEffect(()=>{
const savedWishlist=JSON.parse(localStorage.getItem("wishlist"))||{}
setClickedProduct(savedWishlist)
},[])


  async function handleAddprouctwish(Pid) {
    const resFlag = await addToWishlist(Pid)
    if (resFlag) {
      toast.success("Product added to your Wish list", {
        position: 'top-right',
        duration: 2000
      })
      // ///////////////
      setClickedProduct((prev)=>{
        const updatedClickedProduct={...prev,[Pid]: true }
        localStorage.setItem("wishlist", JSON.stringify(updatedClickedProduct))
      return updatedClickedProduct
     } )
// /////////////////
    } else {
      toast.error("'Fail' Try again", {
        position: 'top-right',
        duration: 2000
      })
    }

  }
  async function handledeleteprouctwish(id) {
    const resFlag = await deleteProductwishlist(id)
    if (resFlag) {

      toast.success("Product deleted from your wishlist", {
        position: 'top-right',
        duration: 2000
      })
      /////////////
      setClickedProduct((prev)=>{
        
        const updatedClickedProduct={...prev,[id]:false}
        localStorage.setItem("wishlist",JSON.stringify(updatedClickedProduct))
        return updatedClickedProduct
      
      })
// ////////////////
    } else {
      toast.error("'Fail' Try again", {
        position: 'top-right',
        duration: 2000
      })
    }
  }

  function handleToggle(id) {
    // //////
    if (clickedProduct[id]) {
      // ///////
      handledeleteprouctwish(id)
      // setIsclicked(true)
    } else {
      handleAddprouctwish(id)
      // setIsclicked(false)

    }
  }





  // ////////////////////////////////////////////////////////////////////////
  const { addProuduct } = useContext(cartcontext)
  const [searchArr, setSearchArr] = useState(null)
  const [valueofinput, setValueofinput] = useState(null)

  async function handleAddProduct(id) {
    const resFlag = await addProuduct(id)
    if (resFlag) {
      toast.success("Product added to your cart", {
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
  const { data, isError, isLoading, error } = useQuery({
    queryKey: "allproducts",
    queryFn: getProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })
  // console.log(data.data.data);

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")

  }
  function getsearch(value) {
    setValueofinput(value)
    //  console.log(value);
    let newArr = structuredClone(data.data.data)
    newArr = newArr.filter((product) => product.category.name.toLowerCase().includes(value.toLowerCase()) || product.title.toLowerCase().includes(value.toLowerCase()))
    setSearchArr(newArr)
    // console.log(searchArr);

  }


  // const [allproducts, setAllproducts] = useState(null)

  // useEffect(() => {
  //   getProducts()
  // }, [])

  if (isLoading) {
    return <>
      <div className='fixed top-0 left-0 h-full w-full bg-[#4FA74F] z-20 flex justify-center items-center'>
        <span className="loadingscreenspinner"></span>
      </div>
    </>
  }

  if (isError) {

    return <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-center  dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{error.response.data.message}</span>
    </div>


  }

  return (
    <>

      <div className='w-[95%] mx-auto'>

        <input id='searchinput' type="text" name='search' placeholder='search by name or category.......' onKeyUp={(e) => e.target.id == "searchinput" ? getsearch(e.target.value) : ""} className="border w-[70%] mx-auto mt-4 border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

        <div className=' sm:px-10 md:px-20  lg:px-10 xl:px-24 px-5 pb-28 ' >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 pt-12 gap-7">

            {valueofinput ? searchArr.map((product) => <div key={product.id} className='cursor-pointer relative group overflow-hidden pb-10 rounded-lg hover:shadow-[2px_3px_8px_3px_rgba(79,167,88,0.8)] duration-500 '>
              <Link to={`/productdetails/${product.id}`}><div>
                <img src={product.imageCover} className='w-full' alt={product.title} />
                <h3 className='py-4 ps-4 text-[#4FA74F]'>{product.category.name}</h3>
                <h4 className='ps-4 font-medium my-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                <div className='pe-2 ps-4 flex justify-between'>
                  {product.priceAfterDiscount ? <div className='flex items-center '>
                    <p className='line-through text-red-600' >{`${product.price} EG`}</p>
                    <p className='ms-2'>{`${product.priceAfterDiscount} EG`}</p>
                  </div> : <p >{`${product.price} EG`}</p>}

                  <div>
                    <i className="fa-solid fa-star  text-yellow-500"></i>
                    <span className='ms-1'>{product.ratingsAverage}</span>
                  </div>
                </div>
              </div></Link>
              <div className='mt-6 flex justify-end pt-3 items-center '>
                <button onClick={() => handleAddProduct(product.id)} type='button' className='left-3 group-hover:bottom-7 bottom-[-100px] absolute lg:px-12  text-white bg-[#4FA74F] py-3 md:px-20 px-14 rounded-lg hover:bg-green-500 duration-500 font-semibold'> + Add </button>
                <i onClick={() => handleToggle(product.id)} className={` ${clickedProduct[product.id]?"text-red-600":""} fa-solid fa-heart text-[28px] pe-4 cursor-pointer`}></i>
              </div>

            </div>) : <>
              {data.data.data.map((product) => <div key={product.id} className='cursor-pointer relative group overflow-hidden pb-10 rounded-lg hover:shadow-[2px_3px_8px_3px_rgba(79,167,88,0.8)] duration-500 '>
                <Link to={`/productdetails/${product.id}`} ><div>
                  <img src={product.imageCover} className='w-full' alt={product.title} />
                  <h3 className='py-4 ps-4 text-[#4FA74F]'>{product.category.name}</h3>
                  <h4 className='ps-4 font-medium my-2'>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                  <div className='pe-2 ps-4 flex justify-between'>
                    {product.priceAfterDiscount ? <div className='flex items-center '>
                      <p className='line-through text-red-600' >{`${product.price} EG`}</p>
                      <p className='ms-2'>{`${product.priceAfterDiscount} EG`}</p>
                    </div> : <p >{`${product.price} EG`}</p>}

                    <div>
                      <i className="fa-solid fa-star  text-yellow-500"></i>
                      <span className='ms-1'>{product.ratingsAverage}</span>
                    </div>
                  </div>
                </div> </Link>
                {/* <p>{product.id}</p> */}
                <div className='mt-6 flex justify-end pt-3 items-center '>
                  <button onClick={() => handleAddProduct(product.id)} type='button' className='left-3 group-hover:bottom-7 bottom-[-100px] absolute text-white bg-[#4FA74F] py-3 md:px-20 lg:px-12  px-14 rounded-lg hover:bg-green-500 duration-500 font-semibold'> + Add </button>
                 {/* ////////// */}
                    <i onClick={() => handleToggle(product.id)} className={` ${clickedProduct[product.id]?"text-red-600":""} fa-solid fa-heart text-[28px] pe-4 cursor-pointer`}></i>
                    {/* ////////// */}
                   
                  



                </div>

              </div>

              )}
            </>

            }
          </div>
        </div>
      </div>






    </>


  )
}
