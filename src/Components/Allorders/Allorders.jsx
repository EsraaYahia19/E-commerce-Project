import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Allorders() {
    const [load, setLoad] = useState(false)
    const [allorderarr, setAllorderarr] = useState(null)

    const { id } = jwtDecode(localStorage.getItem("tkn"))

    // console.log(id);

    useEffect(() => {

        getAllorders()
    }, [])
    async function getAllorders() {
        setLoad(true)
        await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
            .then((res) => {

                setAllorderarr(res.data)
                setLoad(false)
                // console.log(res);

            }).catch((err) => {
                setLoad(false)
                // console.log(err);

            })
    }
    if (load) {
        return <>
            <div className='fixed top-0 left-0 h-full w-full bg-[#4FA74F] z-20 flex justify-center items-center'>
                <span className="loadingscreenspinner"></span>
            </div>
        </>
    }
    return (
        <>
            <section >
                {allorderarr ?
                    <div className="'w-full md:w-[80%] mx-auto text-center">
                        {allorderarr.map((order, idx) =>

                            <div key={idx}>
                                <div className='p-5 mb-3 bg-slate-200 rounded-lg'>
                                    <h2 className='text-[28px]  '>
                                        Total order price: <span className='text-red-600 font-medium'> {order.totalOrderPrice}</span> EGP
                                    </h2>
                                    <h2 className='text-[20px]  '>
                                        Payment Method: <span className='text-red-600 font-medium'> {order.paymentMethodType}</span>
                                    </h2>

                                    <div className='flex flex-wrap justify-center items-center mt-10'>
                                        {order.cartItems.map((item, idx) =>

                                            <div key={idx} className='w-1/6'>
                                                <img src={item.product.imageCover} alt={item.product.subcategory.name} className='w-full' />
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>


                    : <div className='text-[32px] font-extrabold flex items-center h-60 bg-slate-200 justify-center '>
                        <h2 className='text-red-600' >No orders Yet </h2>
                    </div>}




            </section>
        </>
    )
}
