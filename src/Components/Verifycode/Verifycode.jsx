
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authcontext } from '../../Context/Authcontext'

export default function Verifycode() {
    const [err, setErr] = useState(null)
    const [isloading, setIsloading] = useState(false)
    let navigate = useNavigate()
    let forgrt=useNavigate()
    async function registerdata(values) {
      try {
        setIsloading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        // console.log(data);
        setErr(null)
        navigate("/resetpass")
        
  
  
      } catch (error) {
        setIsloading(false)
        setErr(error.response.data.message)
  console.log(error);
  
  
  
      }
  
    }
    let validationSchema = Yup.object().shape({
  
        resetCode: Yup.string().required("code is required to change your password"),
     
    })
    let formik = useFormik({
      initialValues: {
       
        resetCode: "",
       
      },
      validationSchema,
      onSubmit: registerdata
    })
  
    
    return (
      <>
  <div className=' p-10 md:px-28 pb-28 pt-10 '>
        <h2 className='text-[20px] sm:text-[32px] font-bold sm:font-medium mb-5'>Please enter your verification code
        </h2>
  
        <form onSubmit={formik.handleSubmit}>
          {err ? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{err}</span>
          </div> : ""}
  
  
  
  
          {/* --------------------------------------------------------------------------- */}
  
          <div className="mb-5">
            <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code:</label>
            <input type="text" name='resetCode' id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.resetCode}</span>
          </div> : ""}
  
  
          {/* --------------------------------------------------------------------------- */}
  
  
  
          {/* --------------------------------------------------------------------------- */}
  
          <div className=' flex justify-between'>
          
  
          {isloading ? <button type="button" className="text-white  px-14  py-2.5  bg-green-600  focus:outline-none   rounded-full text-lg w-full sm:w-auto  text-center"><span className="loader"></span></button> :
            <button type="submit" className="text-white  border  bg-green-600  focus:outline-none  rounded-full text-lg w-full sm:w-auto px-14 py-2.5 text-center">Verify</button>
          }
        </div>
      </form >
    </div>
        </>
      )
  }
  

