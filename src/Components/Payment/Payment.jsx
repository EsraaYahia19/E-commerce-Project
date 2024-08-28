import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { cartcontext } from '../../Context/Cartcontext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
export default function Payment() {
    const [isonline, setIsonline] = useState(false)
    let navigate = useNavigate()
    const { cartid, clearCart } = useContext(cartcontext)
    // console.log(cartid);
    
    let validationSchema = Yup.object().shape({

        details: Yup.string().required("Name is required"),
        phone: Yup.string().matches(/^(\+2)?01[0125][0-9]{8}$/, "Please enter Egyption phone").required("Phone is required"),
        city: Yup.string().min(3, "At least 3 characters").max(25, "only city").required("City is required"),


    })

    let payformik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },

        onSubmit: detectAndcall,
        validationSchema
    })
    function detectAndcall(values) {
        if (isonline) {
            onlinepayment(values)
        } else {
            cashpay(values)
        }
    }
    function onlinepayment(values) {
        const shippingAddress = {
            shippingAddress: values
        }
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}`, shippingAddress, {
            headers: {
                token: localStorage.getItem("tkn")
            },
            params: {
                url: `http://localhost:5173`
            }
        })
            .then((res) => {
               window.open(res.data.session.url,'_self')

            })
            .catch((error) => {
                toast.error("fail ,Try again", {
                    position: 'top-right',
                    duration: 2000
                })
            })
    }

    function cashpay(values) {
        const shippingAddress = {
            shippingAddress: values
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`, shippingAddress, {
            headers: {
                token: localStorage.getItem("tkn")
            }
        })
            .then((res) => {
                toast.success("Congratulations ,You paid your order", {
                    position: 'top-right',
                    duration: 2000
                })
                navigate("/")
                clearCart()

            })
            .catch((error) => {
                toast.error("fail ,Try again", {
                    position: 'top-right',
                    duration: 2000
                })
            })
    }
    return (
        <>
            <div className=' px-3 md:px-10 lg:px-28 pb-28 pt-10 '>
                <h2 className='text-[32px] font-medium mb-5'>Cash Payment</h2>

                <form onSubmit={payformik.handleSubmit}>

                    {/* --------------------------------------------------------------------------- */}

                    <div className="mb-5">
                        <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details:</label>
                        <input type="text" name='details' id="details" value={payformik.values.details} onChange={payformik.handleChange} onBlur={payformik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {payformik.errors.details && payformik.touched.details ? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">{payformik.errors.details}</span>
                    </div> : ""}


                    {/* --------------------------------------------------------------------------- */}

                    <div className="mb-5">
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone:</label>
                        <input type="tel" name='phone' id="phone" value={payformik.values.phone} onChange={payformik.handleChange} onBlur={payformik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {payformik.errors.phone && payformik.touched.phone ?
                        <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{payformik.errors.phone}</span>
                        </div> : ""}

                    {/* --------------------------------------------------------------------------- */}



                    <div className="mb-5">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city:</label>
                        <input type="text" name='city' id="city" value={payformik.values.city} onChange={payformik.handleChange} onBlur={payformik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {payformik.errors.city && payformik.touched.city ?
                        <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">{payformik.errors.city}</span>
                        </div> : ""}

                    {/* --------------------------------------------------------------------------- */}
                    <div className='flex lg:w-1/2 mx-auto text-center justify-center '>

                        <div className='flex justify-center'>
                            <button onClick={() => setIsonline(false)} type="submit" className="text-white   border cursor-pointer bg-blue-600  hover:bg-blue-800 duration-300 focus:outline-none  rounded-full text-lg sm:w-auto px-10 py-3  text-center">cash</button>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={() => setIsonline(true)} type="submit" className="text-white  mx-auto border cursor-pointer bg-blue-600  hover:bg-blue-800 duration-300 focus:outline-none  rounded-full text-lg  sm:w-auto px-10 py-3  text-center">Debit / Credit card</button>
                        </div>
                    </div>
                </form >
            </div>
        </>
    )
}
