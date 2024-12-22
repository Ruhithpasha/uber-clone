import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../../context/CaptainContext'
import axios from 'axios'
const CaptainProtectionWrapper = ({children}) => {


const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const [isLoading, setisLoading] = useState(true)

     const token = localStorage.getItem('token')
        const navigate = useNavigate()
        // console.log(token);
    
       useEffect(()=>{
        if (!token) {
          navigate('/captain-login')
          
      }
    
       },[token])

       axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
       }).then((response) => {
        if (response.status === 200) {
        setCaptain(response.data.captain)
        setisLoading(false)

          
        }
       }).catch((err) => {
        console.log(err);
        localStorage.removeItem('token')
        navigate('/captain-login')
        
       });

       if (isLoading) {
        return <div>Loading ...</div>
        
       }


  return (
    <>
    {children}
    </>
  )
}

export default CaptainProtectionWrapper