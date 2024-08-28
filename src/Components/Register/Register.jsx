import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authcontext } from '../../Context/Authcontext'



export default function Register() {

 let{token ,setToken} = useContext(authcontext)
const [err, setErr] = useState (null)
const [isloading, setIsloading] = useState(false)
let navigate=useNavigate()
 async function registerdata(values) {
 try {
  setIsloading(true)
  let {data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
  // console.log(data);
  setErr(null)
  navigate("/")
  localStorage.setItem("tkn", data.token)
  setToken(data.token)

 } catch (error) {
  setIsloading(false)
  setErr(error.response.data.message)

 
 }
  
}
let validationSchema=Yup.object().shape({
  name: Yup.string().min(3,"At least 3 characters").max(20,"Long name").required("Name is required"),
  email: Yup.string().email("Email is invalid try another").required("Email is required"),
  password: Yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password should contain at least a number, and at least a special character  ").required("Password is required"),
  rePassword: Yup.string().oneOf([Yup.ref("password"),"Repassword and Password don't match"]).required("Repassword is required"),
  phone: Yup.string().matches(/^(\+2)?01[0125][0-9]{8}$/,"Please enter Egyption phone").required("Phone is required"),
})
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema,
    onSubmit:registerdata
  })
  return (
    <>
<div className=' px-10 md:px-28 pb-28 pt-10 '>
    <h2 className='text-[32px] font-medium mb-5'>Register Now</h2>

<form onSubmit={formik.handleSubmit}>
{err? <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{err}</span> 
</div> :""}


  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
    <input type="text" name='name' id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
 {formik.errors.name && formik.touched.name ?<div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span> 
</div> :"" }
  

{/* --------------------------------------------------------------------------- */}

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
    <input type="email" name='email' id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
{formik.errors.email && formik.touched.email ?<div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span> 
</div> : ""}
  

{/* --------------------------------------------------------------------------- */}

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password:</label>
    <input type="password" name='password' id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.password && formik.touched.password ?
  <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span> 
</div> : ""}

{/* --------------------------------------------------------------------------- */}

  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repassword:</label>
    <input type="password" name='rePassword' id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.rePassword && formik.touched.rePassword ?
  <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span> 
</div> : "" }

{/* --------------------------------------------------------------------------- */}

  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone:</label>
    <input type="tel" name='phone' id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border  border-gray-300 text-black  rounded-lg focus:outline-none focus:border-[4px] focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
  </div>
  {formik.errors.phone && formik.touched.phone ?
  <div className="p-8 mb-4 text-sm text-red-800 rounded-lg bg-red-200 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone}</span> 
</div> :" "}

{/* --------------------------------------------------------------------------- */}

  <div className=' flex justify-end'>
  {isloading?  <button type="button" className="text-white  border py-4 px-14 bg-green-600  focus:outline-none   rounded-full text-lg w-full sm:w-auto  text-center"><span className="loader"></span></button>:
  <button type="submit" className="text-white  border cursor-pointer  bg-green-600  focus:outline-none  rounded-full text-lg w-full sm:w-auto px-5 py-2.5 text-center">Register now</button>
  }
  </div>
</form>
</div>
    </>
  )
}
