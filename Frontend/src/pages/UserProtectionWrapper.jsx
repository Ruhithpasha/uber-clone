import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { userdataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectionWrapper = ({children}) => {

  const { user, setuser } = React.useContext(userdataContext)
  const [isLoading, setisLoading] = useState(true)

  

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    // console.log(token);

   useEffect(()=>{
    if (!token) {
      navigate('/login')
      
  }

   },[token])

   axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`,{
  headers:{
    Authorization: `Bearer ${token}` 
  }
  }).then((response) => {
if (response.status === 200) {
  setuser(response.data.user)
  setisLoading(false)
  
}

  }).catch((err) => {
console.log(err);
localStorage.removeItem('token')
navigate('/login')

  }
  );

  if (isLoading) {
    return <div>Loading ...</div>
    
  }

   
    
  return (
<>
{children}
</>  )
}

export default UserProtectionWrapper