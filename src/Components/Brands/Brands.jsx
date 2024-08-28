import React, { useState } from 'react'
import logo from "../../assets/images/slider-2.jpeg"
import axios from 'axios'
import { useQuery } from 'react-query'
export default function Brands() {

  const [showmodal, setShowmodal] = useState("hidden")
  const [onlyOneBrand, setOnlyOneBrand] = useState("null")
  function getallbrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }
  function getmodal(x, id) {
    setShowmodal(x)
    // console.log(idBrand);
    getonlybrand(id)
  }
   async function getonlybrand(id) {
    let{data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  
    setOnlyOneBrand(data.data)
    // console.log((data.data));
    
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: "brands",
    queryFn: getallbrands,
    refetchOnMount:false,
    refetchOnWindowFocus:false
  })

  // console.log((error));

  if (isLoading) {
    return <>
      <div className='fixed top-0 left-0 h-full w-full bg-[#4FA74F] z-20 flex justify-center items-center'>
        <span className="loadingscreenspinner"></span>
      </div>
    </>
  }

  if (isError) {

    return <div className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">{error.response.data.message}</span>
    </div>


  }
  return (
    <>

      <div className='w-[85%] mx-auto  text-center'>
        <h1 className='text-[#4FA74F] font-semibold text-[40px] '>All Brands</h1>

        <div className='  pb-28 ' >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 pt-12 gap-7">
            {data.data.data.map((brand) => <div key={brand._id} onClick={()=>getmodal("block", brand._id )} className='cursor-pointer border border-gray-300 relative group overflow-hidden pb-8 rounded-lg hover:shadow-[2px_3px_8px_3px_rgba(79,167,88,0.8)] duration-500 '>

              <img src={brand.image} className='w-full' alt={brand.name} />
              <h3 className='pt-4 ps-4 text-black]'>{brand.name}</h3>




            </div>



            )}
          </div>
        </div>
      </div>




      <div onClick={(e)=> e.target.id=="modal"? getmodal("hidden") :""} id='modal' className={`modal fixed top-0 left-0 right-0 bottom-0  z-[60] bg-[#000000a0] ${showmodal}`}>
        <div className='w-1/3  bg-white mx-auto mt-12 rounded-lg'>
          <div className='flex justify-end py-3 px-4 '>
            <i className="fa-solid fa-xmark text-2xl text-gray-500 cursor-pointer " onClick={()=>getmodal("hidden")}></i>
          </div>

          <div className='flex items-center justify-between border border-s-0 border-e-0 border-gray-200 py-10'>
            <div className='w-[50%] ps-7'>
              <h4 className='font-medium  text-[40px] text-[#4FA74F]'>{onlyOneBrand.name}</h4>
              <h5>{onlyOneBrand.slug}</h5>
            </div>
            <div className='w-[40%] pe-4'>
              <img src={onlyOneBrand.image} className='w-full ' alt={onlyOneBrand.name} />
            </div>
          </div>
          <div className='flex justify-end  p-4  '>
            <button type='button ' onClick={()=>getmodal("hidden")} className='text-white rounded-lg bg-gray-500 py-2 px-4 my-2 hover:bg-gray-700 duration-200 '>Close</button>
          </div>
        </div>

      </div>
    </>
  )
}
