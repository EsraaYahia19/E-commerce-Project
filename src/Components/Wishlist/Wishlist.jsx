import React, { useContext } from 'react'
import { wishcontext } from '../../Context/Wishlistcontext'
import logo from "../../assets/images/scarf.jpeg"
import { cartcontext } from '../../Context/Cartcontext'
import toast from 'react-hot-toast'
export default function Wishlist() {
  const { newdata,deleteProductwishlist } = useContext(wishcontext)
  const{addProuduct}=useContext(cartcontext)
  // console.log(newdata);
// function handleremovewish(id) {
//   deleteProductwishlist(id)
// }
async function handleremovewish(id) {
  await deleteProductwishlist(id)
  const wishlist=JSON.parse(localStorage.getItem("wishlist"))||{}
  delete wishlist[id]
  localStorage.setItem("wishlist",JSON.stringify(wishlist))
  toast.success("product deleted from your wishlist",{
    position: 'top-right',
    duration: 2000
  })
}


async function handleaddtocart(id) {
  const resFlag= await addProuduct(id)
  
  if (resFlag) {
    toast.success("Product added to your cart", {
        position: 'top-right',
        duration: 2000
    })
    deleteProductwishlist(id)
} else {
    toast.error("'Fail' Try again", {
        position: 'top-right',
        duration: 2000
    })
}

}
  return (<>

    {newdata ?

      newdata.length === 0 ?
        <div className='text-[32px] bg-slate-200 font-extrabold  py-20 text-center '>

          <div className='flex justify-center items-center '>
            <i className="fa-solid fa-heart-crack text-[100px] text-red-600"></i>
          </div>
          <h2 className='mb-11 text-black'>Your Wishlist is empty</h2>
        </div>



        : <div className='lg:w-[85%]  mx-auto'>
          <div className=' sm:px-10 md:px-20  lg:px-10 xl:px-24 px-5 pb-28 ' >
            <h1 className='font-medium text-[32px] pt-10 pb-5'>My WishList</h1>
            {newdata.map((item) =>
              <div key={item._id} className="bg-sate-300 flex justify-between items-center bg-gray-100 my-5 p-2 xl:p-4">
                <div className='flex  items-center xl:w-[40%] '>
                  <img src={item.imageCover} className='w-[40%]' alt={item.title} />
                  <div className='ps-10 '>
                    <h3 className=' lg:text-2xl lg:font-semibold'>{item.title}</h3>
                    <p className='lg:text-lg pt-1 ps-1 lg:font-medium '><span className='text-green-600 '>{item.price}</span> EGP</p>
                    <button onClick={()=>handleremovewish(item._id)} className='bg-red-600 hover:bg-red-800 duration-300 text-white md:px-3 py-1 px-2 md:py-2 mt-5 rounded-xl '><i className="pe-2 fa-solid fa-trash"></i>Remove</button>
                  </div>
                </div>
                <div className='w-[60%] md:w-[40%] md:flex md:justify-end '>
                  <button onClick={()=>handleaddtocart(item._id)} className='bg-green-600 font-medium hover:bg-green-800 duration-300 text-white py-3 px-2 sm:px-8 md:py-4 mt-5 rounded-xl '  >Add To Cart</button>
                </div>
              </div>
            )}



          </div>
        </div>





      : <div className='text-[32px] bg-slate-200 font-extrabold  py-20 text-center '>

        <div className='flex justify-center items-center '>
          <i className="fa-solid fa-heart-crack text-[100px] text-red-600"></i>
        </div>
        <h2 className='mb-11 text-black'>Your Wishlist is empty</h2>
      </div>}

  </>
  )
}
