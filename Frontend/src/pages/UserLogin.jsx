import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userdataContext } from '../../context/UserContext'
import axios from 'axios'
// this is the login page for the user
const UserLogin = () => {

  const {user, setuser} = React.useContext(userdataContext)
  const navigate = useNavigate()
  // using the useState hook to store the email and password
  // the usestate hook is used to store the state of the component
  // the state of component means the data that is stored in the component
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [userData, setuserData] = useState({})

  const submitHandler= async (e)=>{
   e.preventDefault();
   // storing the data in the userData object and the userData object is stored in the userData state
  const newUser ={
    email:email,
    password:password
  }
   console.log(userData);



   try{

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`,newUser)                  
    
    if (response.status ===200) {
      const data = response.data
      // the user data is set in the usercontext and the user is navigated to the home page
      setuser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }

   }catch(error){
    console.log(error);
   }
   
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-24 mb-5' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
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

 <p className='text-center pb-5 text-lg'>New here?<Link to='/signup' className='text-blue-600 '> Create new Account</Link></p>

  </form>  
      </div> 
      <div>
      <Link to='/captain-login' className='bg-[#28c147] text-white font-semibold mb-2 px-4 py-4 w-full text-lg placeholder:text-base flex items-center justify-center rounded-sm' >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin


//steps to connect this with backend

//step1: import the userdataContext from the UserContext.jsx file
//step2: import the axios from 'axios' to make the api calls
//step3: create a user using state and assign the useContext to the user and setuser 
//step4: create a newUser to store email and password in submit handler
//step5:create a navigate to use the useNavigate hook to navigate to the home page
//step6: get the response from the api via axios and set the user data in the usercontext and navigate to the home page
//step7 : dont forget to add the response in try catch block
//step8: check if the resopnse is 200 then set the user data in the usercontext and navigate to the home page
//step9: if there is an error then console.log the error