import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home';
import Brands from './Components/Brands/Brands';
import Wishlist from './Components/Wishlist/Wishlist';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import Notfound from './Components/Notfound/Notfound';
import Navbaar from './Components/Navbar/Navbaar'
import Layout from './Components/Layout/Layout'
import Authcontext from './Context/Authcontext'
import Protectedrout from './Components/Protectedroute/Protectedrout'
import Forgetpass from './Components/Forgetpass/Forgetpass'
import Verifycode from './Components/Verifycode/Verifycode'
import Resetpass from './Components/Resetpass/Resetpass'
import { QueryClient, QueryClientProvider } from 'react-query'
import Productdetails from './Components/Productdetails/Productdetails'
import Cartcontextprovider from './Context/Cartcontext'
import { Toaster } from 'react-hot-toast'
import Wishlistcontextprovider from './Context/Wishlistcontext'
import Payment from './Components/Payment/Payment'
import Allorders from './Components/Allorders/Allorders'




let x = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      {
        index: true, element: <Protectedrout>
          <Home />
        </Protectedrout>
      },
      {
        path: "cart", element: <Protectedrout>
          <Cart />
        </Protectedrout>
      },
      {
        path: "wishlist", element: <Protectedrout>
          <Wishlist />
        </Protectedrout>
      },
      {
        path: "products", element: <Protectedrout>
          <Products />
        </Protectedrout>
      },
      {
        path: "categories", element: <Protectedrout>
          <Categories />
        </Protectedrout>
      },
      {
        path: "brands", element: <Protectedrout>
          <Brands />

        </Protectedrout>
      },
      {
        path: "payment", element: <Protectedrout>
          <Payment />

        </Protectedrout>
      },
      {
        path: "/allorders", element: <Protectedrout>
          <Allorders />

        </Protectedrout>
      },
      {
        path: "productdetails/:id", element: <Protectedrout>
          <Productdetails />

        </Protectedrout>
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgetpass", element: <Forgetpass /> },
      { path: "verifycode", element: <Verifycode /> },
      { path: "resetpass", element: <Resetpass /> },
      { path: "*", element: <Notfound /> }
    ]
  }
])

const reactQueryconfig = new QueryClient()

function App() {


  return (
    <>

      <Authcontext>
        <QueryClientProvider client={reactQueryconfig}>

          <Cartcontextprovider>
            <Wishlistcontextprovider>
            <RouterProvider router={x}></RouterProvider>
            <Toaster/>
            </Wishlistcontextprovider>
          </Cartcontextprovider>
        </QueryClientProvider>
      </Authcontext>
    </>
  )
}

export default App
