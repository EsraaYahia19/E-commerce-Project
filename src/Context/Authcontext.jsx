import React, { createContext, useEffect, useState } from 'react'


 export let authcontext=createContext()

export default function Authcontext({children}) {


    const [token, setToken] = useState(null)
    useEffect(()=>{
        if (localStorage.getItem("tkn")) {
            setToken(localStorage.getItem("tkn"))
        }
    } ,[])
  return (
    <authcontext.Provider  value={{token,setToken}}>  
    
    
    {children}
    
    
    </authcontext.Provider > 
     )
}
