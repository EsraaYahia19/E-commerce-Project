import React, { useContext, useEffect, useState } from 'react'
import logo from "../../assets/images/scarf.jpeg"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductdetailsSlider from '../ProductdetailsSlider/ProductdetailsSlider'
import toast from 'react-hot-toast'
import { cartcontext } from '../../Context/Cartcontext'
import { wishcontext } from '../../Context/Wishlistcontext'


export default function Productdetails() {
    const { id } = useParams()
    const [heartbtn, setHeartbtn] = useState("text-black")
    const { addToWishlist, deleteProductwishlist } = useContext(wishcontext)

    async function handleAddprouctwish(Pid) {
        const resFlag = await addToWishlist(Pid)
        if (resFlag) {
            toast.success("Product added to your Wish list", {
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
    async function handledeleteprouctwish(id) {
        const resFlag = await deleteProductwishlist(id)
        if (resFlag) {
       
            toast.success("Product deleted from your wishlist", {
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
    // ////////////////////////////////////////
useEffect(()=>{
    if(localStorage.getItem(`productinwish${id}`)){

        setHeartbtn(localStorage.getItem(`productinwish${id}`))
    }

},[])
// useEffect(()=>{
  

//         setHeartbtn(localStorage.getItem(`productinwish${id}`))
    

// },[heartbtn])
  

function handletoggle(){
    if (heartbtn == "text-black") {
        setHeartbtn("text-red-600")
        // handleAddprouctwish(data.data.data._id)
        // console.log(id);
        
        handleAddprouctwish(id)
        localStorage.setItem(`productinwish${id}`, "text-red-600")
    }else{
        setHeartbtn("text-black")
        // handledeleteprouctwish(data.data.data._id)
        handledeleteprouctwish(id)
        localStorage.setItem(`productinwish${id}`, "text-black")

    }

}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    const { addProuduct } = useContext(cartcontext)
    async function handleAddProduct(Pid) {
        const resFlag = await addProuduct(Pid)
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





    function getdetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isError, isLoading, error } = useQuery({
        queryKey: `productdetails${id}`,
        queryFn: getdetails
    })
    //    console.log(data.data)


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

                <div className=' sm:px-10 md:px-20  lg:px-10 xl:px-20 px-5 pb-28 ' >
                    <div className="flex justify-between items-center ">

                        <div className='w-[30%] '>
                            <ProductdetailsSlider images={data.data.data.images} />
                            {/* <img src={data.data.data.imageCover} className='w-full' alt="" /> */}
                        </div>
                        <div className='w-[65%]'>
                            <h2 className='text-black font-bold mb-2 text-[32px]'>{data.data.data.title}</h2>
                            <p className='mb-2'>{data.data.data.description}</p>
                            <div className='pe-2  flex justify-between'>
                                {data.data.data.priceAfterDiscount ?
                                    <div className='flex items-center '>
                                        <p className='line-through text-red-600' >{data.data.data.price} EGP</p>
                                        <p className='ms-2'>{data.data.data.priceAfterDiscount} EGP</p>
                                    </div> : <p className='' >{data.data.data.price} EGP</p>}

                                <div>
                                    <i className="fa-solid fa-star  text-yellow-500"></i>
                                    <span className='ms-1'>{data.data.data.ratingsAverage}</span>
                                </div>
                            </div>
                            {/* <p>{(data.data.data._id)}</p> */}
                            <div className='mt-6 flex justify-between pt-3 items-center '>
                                <button onClick={() => { handleAddProduct(data.data.data._id) }} type='button' className=' text-white bg-[#5dc55d] py-2 md:px-20  w-[80%] rounded-lg hover:bg-green-400 duration-500 font-semibold'> + Add </button>


                                <i onClick={() => {
                                   handletoggle()
                                }} className={`${heartbtn} fa-solid fa-heart text-[28px] pe-4 cursor-pointer`}></i>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
