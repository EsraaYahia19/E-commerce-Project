import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authcontext } from '../../Context/Authcontext'

export default function Resetpass() {
  let { token, setToken } = useContext(authcontext)
  const [err, setErr] = useState(null)
  const [isloading, setIsloading] = useState(false)
  let navigate = useNavigate()
  let forgrt = useNavigate()
  async function registerdata(values) {
    try {
      setIsloading(true)
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
      console.log(data);
      setErr(null)
      navigate("/")
      localStorage.setItem("tkn", data.token)
      setToken(data.token)


    } catch (error) {
      setIsloading(false)
      setErr(error.response.data.message)




    }

  }
  let validationSchema = Yup.object().shape({

    email: Yup.string().email("Email is invalid try another").required("Email is required"),
    newPassword: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password should contain at least a number, and at least a special character  ").required("Password is required"),

  })
  let formik = useFormik({
    initialValues: {

      email: "",
      newPassword: "",

    },
    validationSchema,
    onSubmit: registerdata
  })


  return (
    <>
      <div className='px-10 md:px-28 pb-28 pt-10 '>
        <h2 className='text-[20px] sm:text-[32px] font-bold sm:font-medium mb-5'>Reset your account password</h2>

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
            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password:</label>
            <input type="password" name='newPassword' id="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          {formik.errors.newPassword && formik.touched.newPassword ?
            <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div> : ""}

          {/* --------------------------------------------------------------------------- */}



          {/* --------------------------------------------------------------------------- */}

          <div className=' flex justify-between'>


            {isloading ? <button type="button" className="  px-14  py-2.5 text-green-700 border-green-600 hover:bg-green-600 hover:text-white duration-500 focus:outline-none   rounded-full text-lg w-full sm:w-auto  text-center"><span className=" text-green-700 loader"></span></button> :
              <button type="submit" className="text-green-700  border cursor-pointer border-green-600   hover:bg-green-600 hover:text-white duration-500 focus:outline-none  rounded-full text-lg w-full sm:w-auto px-14 py-2.5 text-center">Reset password</button>
            }
          </div>
        </form >
      </div>
    </>
  )
}

