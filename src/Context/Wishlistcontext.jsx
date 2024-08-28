import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authcontext } from './Authcontext'


export const wishcontext =createContext()

export default function Wishlistcontextprovider({children}) {
    let headers = { token: localStorage.getItem("tkn") }

    const { token } = useContext(authcontext)


const [newdata, setNewdata] = useState(null)
const [numofitems, setNumofitems] = useState(0)
async function addToWishlist(id) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", {
        "productId": id
    }, {

        headers
    })
        .then((res) => {
            // setCartproducts(res.data.data.products)
            // setTotalCartPrice(res.data.data.totalCartPrice)
            // setNumOfcartItems(res.data.numOfCartItems)
        //   console.log(res.data.data);
        //   setNewdata(res.data.data)
        getwishlist()
            return true
        })
        .catch((error) => {
            
          

            return false

        })
}
async function deleteProductwishlist(pId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pId}`, { headers })
        .then((res) => {
            // setNewdata (res.data.data)
            // console.log(res.data.data);
            getwishlist()
            return true

        })
        .catch((error) => {

            console.log(error);

            return false

        })
}

function getwishlist() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((res)=>{
        setNewdata(res.data.data)
        setNumofitems(res.data.count)

    }).catch((err)=>{


    })
}

useEffect(() => {
    if (token) {
        getwishlist()
    }
}, [token])


  return (
    <wishcontext.Provider  value={{
        addToWishlist,
        deleteProductwishlist,
        newdata,
        getwishlist,
        numofitems,


    }}>
    {children}
    </wishcontext.Provider >
  )
}
