import React from 'react'
import Homeslider from '../Homeslider/Homeslider'
import purpleImage from "../../assets/images/purple bag.jpg"
import bags from "../../assets/images/bags.jpg"
import musictools from "../../assets/images/music tools.jpg"
import acces from "../../assets/images/exesories.jpg"
import Homeslider22 from '../Homeslider2/Homeslider22'
import Products from './../Products/Products';



export default function Home() {
  return (
    <>
      <div className='w-[40%]  mx-auto'>
        <div className=' flex flex-wrap'>
          <div className='w-1/2'>
            <Homeslider />
          </div>

          <div className='w-1/2'>
            <div >
              <img src={bags} className='w-full' alt="bags" />
            </div>
            <div>
              <img src={musictools} className='w-full' alt="musictools" />
            </div>
          </div>
        </div>

      </div>

      <div className='h-[350px] my-24  cursor-grab  '>
        <Homeslider22 />

      </div>

<Products/>


    </>
  )
}
