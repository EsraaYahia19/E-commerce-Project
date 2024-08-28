
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authcontext } from '../../Context/Authcontext'


export default function Forgetpass() {
    // let { token, setToken } = useContext(authcontext)
    const [err, setErr] = useState(null)
    const [isloading, setIsloading] = useState(false)
    let navigate = useNavigate()
    let forgrt=useNavigate()
    async function registerdata(values) {
      try {
        setIsloading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        // console.log(data);
        setErr(null)
        navigate("/verifycode")
        
  
  
      } catch (error) {
        setIsloading(false)
        setErr(error.response.data.message)
        console.log(error);
  
  
      }
  
    }
    let validationSchema = Yup.object().shape({
  
      email: Yup.string().email("Email is invalid try another").required("Email is required"),
     
    })
    let formik = useFormik({
      initialValues: {
       
        email: "",
       
      },
      validationSchema,
      onSubmit: registerdata
    })
  
    return (
      <>
  <div className=' px-10 md:px-28 pb-28 pt-10 '>
        <h2 className='text-[20px] sm:text-[32px] font-bold sm:font-medium mb-5'>Please enter your email
        </h2>
  
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
  
  
  
          {/* --------------------------------------------------------------------------- */}
  
          <div className=' flex justify-between'>
          
  
          {isloading ? <button type="button" className="text-white  px-14  py-2.5  bg-green-600  focus:outline-none   rounded-full text-lg w-full sm:w-auto  text-center"><span className="loader"></span></button> :
            <button type="submit" className="text-white  border cursor-pointer bg-green-600  focus:outline-none  rounded-full text-lg w-full sm:w-auto px-14 py-2.5 text-center">Enter</button>
          }
        </div>
      </form >
    </div>
        </>
      )
  }
  
