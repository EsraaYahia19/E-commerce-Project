import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authcontext } from '../../Context/Authcontext'
import { cartcontext } from '../../Context/Cartcontext'
import { wishcontext } from '../../Context/Wishlistcontext'

export default function Login() {
   const {getwishlist}=useContext(wishcontext)
     const{getUserCart}=useContext(cartcontext)
  let { token, setToken } = useContext(authcontext)
  const [err, setErr] = useState(null)
  const [isloading, setIsloading] = useState(false)
  let navigate = useNavigate()
  let forgrt=useNavigate()
  async function registerdata(values) {
    try {
      setIsloading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      // console.log(data);
      setErr(null)
      localStorage.setItem("tkn", data.token)
      setToken(data.token)
      getUserCart()
      getwishlist()
      navigate("/")



    } catch (error) {
      setIsloading(false)
      setErr(error.response.data.message)



    }

  }
  let validationSchema = Yup.object().shape({

    email: Yup.string().email("Email is invalid try another").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password should contain at least a number, and at least a special character  ").required("Password is required"),

  })
  let formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",
     
    },
    validationSchema,
    onSubmit: registerdata
  })

  function forgetfn() {
    forgrt("/forgetpass")
  }
  return (
    <>
<div className=' px-10 md:px-28 pb-28 pt-10 '>
      <h2 className='text-[32px] font-medium mb-5'>Login Now</h2>

      <form onSubmit={formik.handleSubmit}>
        {err ? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{err}</span>
        </div> : ""}




        {/* --------------------------------------------------------------------------- */}

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{formik.errors.email}</span>
        </div> : ""}


        {/* --------------------------------------------------------------------------- */}

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
          <input type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        {formik.errors.password && formik.touched.password ?
          <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div> : ""}

        {/* --------------------------------------------------------------------------- */}



        {/* --------------------------------------------------------------------------- */}

        <div className=' flex flex-col sm:flex-row justify-between'>
          <p  onClick={forgetfn} className='my-2 md:my-0 cursor-pointer hover:text-[#4FA74F] md:text-2xl font-semibold duration-500'>forget your password ?</p>

        {isloading ? <button type="button" className="text-white  sm:px-14  sm:py-2.5  bg-green-600  focus:outline-none   rounded-full text-lg w-full sm:w-auto  text-center"><span className="loader"></span></button> :
          <button type="submit" className="text-white mt-2 py-1 sm:mt-0  border cursor-pointer bg-green-600  focus:outline-none  rounded-full text-lg w-full sm:w-auto sm:px-14 sm:py-2.5 text-center hover:bg-green-700 duration-500">login</button>
        }
      </div>
    </form >
    </div>
      </>
    )
}
