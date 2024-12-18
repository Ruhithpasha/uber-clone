import React, { useEffect } from 'react'
// import { useContext } from 'react'
// import { userdataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectionWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    console.log(token);

   useEffect(()=>{
    if (!token) {
      navigate('/login')
      
  }

   },[token])

   
    
  return (
<>
{children}
</>  )
}

export default UserProtectionWrapper