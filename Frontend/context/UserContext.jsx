import React, { createContext, useState } from 'react'
import UserSignup from '../src/pages/UserSignup'
import { useSearchParams } from 'react-router-dom'
// creating the usercontext to store the data of the user
export const userdataContext = createContext()
// the usercontext is used to store the data of the user
const UserContext = ({children}) => {
// using the useState hook to store the data of the user
    const [user, setuser] = useState({
      // the data of the user is stored in the user object
        fullname:{
            firstname:'',
            lastname:''
        },
        email:'',
        password:''
    })
  return (
    <div>
      {/* // the data of the user is stored in the user object and the user object is stored in the usercontext */}
        <userdataContext.Provider value={{user, setuser}}> 
          {/* //the userdataContext.provider is used to provide the data of user to all the routes in the application */}
          {children}   {/* //the children are the routes of the application */}
            </userdataContext.Provider>
    </div>
  )
}

export default UserContext