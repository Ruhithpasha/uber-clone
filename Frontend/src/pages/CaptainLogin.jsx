import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useContext  } from 'react'
import axios from 'axios'
import { CaptainDataContext } from "../../context/CaptainContext"
import { useNavigate } from 'react-router-dom';


// this is the login page for the captain
const CaptainLogin = () => {
// using the useState hook to store the email and password
// the usestate hook is used to store the state of the component
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  // const [captainData, setcaptainData] = useState({})

 const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
// this function is used to submit the form this function is called when the form is submitted
  const submitHandler= async (e)=>{
   e.preventDefault();
   const captainData ={
    email:email,
    password:password
   }
   console.log(captainData);


   try {
    const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/login`,captainData)
    console.log("this is response",response);
    
            
    if (response.status === 200) {
      const data = response.data;
      console.log("this is data",data);
      
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate('/CaptainHome')
    } else {
      console.log(`Unexpected response status: ${response.status}`);
    }
    
   } catch (error) {
    console.error("Error during login:", error.response ? error.response.data : error.message);
  }
   }
   
  





  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-24 mb-1' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
<form action="" onSubmit={(e)=>{
  submitHandler(e)
  setEmail('')
  setpassword('')
  console.log(email,password);
  
}}>
  <h3 className='text-xl mb-2' >What's your email</h3>
  <input
   type="email" 
   value={email}
   onChange={(e)=>{setEmail(e.target.value)}}
   required 
   placeholder='email@example.com'
   className='bg-[#eeeeee] mb-7 rounded px-4 py-4 w-full text-lg placeholder:text-base'/>
{/* password */}

  <h3 className='text-xl mb-2'>Enter Password</h3>
  <input
   type="password" 
   value={password}
   onChange={(e)=>{setpassword(e.target.value)}}
   required 
   placeholder='Enter password'
   className='bg-[#eeeeee] mb-7 rounded px-4 py-4 w-full text-lg placeholder:text-base' />
  <button className='bg-[#111] text-white font-semibold mb-3 px-4 py-4 w-full text-lg placeholder:text-base rounded-sm' >Login</button>

 <p className='text-center pb-5 text-lg'>Wanna Join?<Link to='/captain-signup' className='text-blue-600 '> Register with Us</Link></p>

  </form>  
      </div> 
      <div>
      <Link to='/login' className='bg-[#e7a429] text-white font-semibold mb-2 px-4 py-4 w-full text-lg placeholder:text-base flex items-center justify-center rounded-sm' >Sign in User</Link>
      </div>
    </div>
  )
}


export default CaptainLogin