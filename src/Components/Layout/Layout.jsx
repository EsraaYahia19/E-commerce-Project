import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbaar from '../Navbar/Navbaar'

export default function Layout() {
    return (
        <>
          
            <Navbaar/>
            <div className='pt-28'>
            <Outlet />
            </div>
           
        </>
    )
}
