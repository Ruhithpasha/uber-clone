import React, { createContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
export const userdataContext = createContext()
const UserContext = ({children}) => {

    const [user, setuser] = useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:'',
        password:''
    })
  return (
    <div>
        
        <userdataContext.Provider value={{user, setuser}}>
            {children}
            </userdataContext.Provider>
    </div>
  )
}

export default UserContext