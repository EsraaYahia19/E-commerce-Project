import React, { useState } from 'react'
import logo from "../../assets/images/slider-2.jpeg"
import axios from 'axios'
import { useQuery } from 'react-query'

export default function Categories() {

  const [load, setLoad] = useState(false)
  const [subcategories, setSubcategories] = useState(null)
  const [namecat, setNamecat] = useState(null)
  function gestallcategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  async function getoncategory(id, namecategory, y) {
    setLoad(y)
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setSubcategories(data.data)
    setNamecat(namecategory)
    setLoad(false)
    console.log(data.data);


  }


  const { data, isError, isLoading, error } = useQuery({
    queryKey: "categories",
    queryFn: gestallcategories,
    refetchOnMount: false,
    refetchOnWindowFocus: false
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

      <div className='lg:w-[85%] w-[70%] md:w-[80%] mx-auto  text-center'>
        <h1 className='text-[#4FA74F] font-semibold text-[40px] '>Categories</h1>

        <div className='  pb-28 ' >
          <div className="grid  md:grid-cols-3 pt-12 gap-7">
            {data.data.data.map((category) => <div key={category._id} onClick={() => getoncategory(category._id, category.name ,"true")} className='cursor-pointer border  border-gray-300 relative group overflow-hidden pb-5 rounded-lg hover:shadow-[2px_3px_8px_3px_rgba(79,167,88,0.8)] duration-500 '>

              <img src={category.image} className='w-full h-[300px]  object-cover object-center' alt={category.name} />
              <h3 className='pt-5  text-[#198754] text-center font-medium text-[25px] '>{category.name}</h3>
            </div>)}


          </div>


{load?
  <div className='fixed top-0 left-0 h-full w-full bg-[#4fa74fa8] z-20 flex justify-center items-center'>
            <span className="loadingscreenspinner"></span>
          </div> :<>  {subcategories ? <div className='subcategories pt-12'>
              <h2 className='text-[#4FA74F] font-bold text-[32px] text-center'> {namecat} subcategories</h2>
              <div className=' grid  md:grid-cols-3 gap-7  pt-12 '>
                {subcategories.map((sub) => <div className=' border  border-gray-300 relative group overflow-hidden pb-5 rounded-lg hover:shadow-[2px_3px_8px_3px_rgba(79,167,88,0.8)] duration-500 '>

                  <h3 className='pt-5  text-black text-center font-medium text-[25px] '>{sub.name}</h3>
                </div>)}

              </div>
            </div> : ""}
            </>

       }   



        </div>
      </div>





    </>
  )
}
