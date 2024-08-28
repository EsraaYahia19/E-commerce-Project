import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authcontext } from './Authcontext';


export const cartcontext = createContext()

export default function Cartcontextprovider({ children }) {
    const { token } = useContext(authcontext)
    const [cartproducts, setCartproducts] = useState(null)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [numOfcartItems, setNumOfcartItems] = useState(0)
    const [cartid, setCartid] = useState(null)
    let headers = { token: localStorage.getItem("tkn") }

    async function addProuduct(productid) {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
            "productId": productid
        }, {

            headers: {
                token: localStorage.getItem("tkn")
            }
        })
            .then((res) => {
                // setCartproducts(res.data.data.products)
                // setTotalCartPrice(res.data.data.totalCartPrice)
                // setNumOfcartItems(res.data.numOfCartItems)
                getUserCart()
                return true
            })
            .catch((error) => {

                return false

            })
    }
    function getUserCart() {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
            .then((res) => {
                setCartproducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setNumOfcartItems(res.data.numOfCartItems)
                setCartid(res.data.data._id)


            })
            .catch((error) => {

                console.log(error);


            })
    }
    function updateCart(pId, newCount) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, {
            "count": newCount
        }, { headers })
            .then((res) => {
                setCartproducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setNumOfcartItems(res.data.numOfCartItems)
            })
            .catch((error) => {
                console.log(error);

            })

    }
// delete item msh cart elmafrood
    async function deleteCart(pId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, { headers })
            .then((res) => {
                setCartproducts(res.data.data.products)
                setTotalCartPrice(res.data.data.totalCartPrice)
                setNumOfcartItems(res.data.numOfCartItems)
                return true

            })
            .catch((error) => {

                console.log(error);

                return false

            })
    }
    function clearCart() {
        axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        .then((res) => {
            setCartproducts(null)
            setTotalCartPrice(0)
            setNumOfcartItems(0)


        })
        .catch((error) => {

            console.log(error);


        })
    }
// function updateUi() {
    
// }



    // mn 3nd huda
    useEffect(() => {
        if (token) {
            getUserCart()
        }
    }, [token])
    // ///

    return (<cartcontext.Provider value={{
        addProuduct,
        cartproducts,
        totalCartPrice,
        numOfcartItems,
        getUserCart,
        updateCart,
        deleteCart,
        clearCart,
        cartid,
     
    }}  >
        {children}

    </cartcontext.Provider>
    )
}
