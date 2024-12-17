import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState("");
    const [userData, setuserData] = useState('')
    const submitHandler=(e)=>{
      e.preventDefault()
      setEmail("");
      setpassword("");
      setfirstname("");
      setlastname("");
      console.log(firstname, lastname, email, password);
      setuserData({
        fullname:{
          firstname:firstname,
          lastname:lastname,

        },
        email:email,
        password:password
  
        
      })
      console.log({userData});
      
  
    }
    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-24 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
           
          }}
        >
            <h3 className="text-xl mb-2">What's your name</h3>
          <div className="flex gap-2 justify-between  ">
            <input
             type="text"
             value={firstname}
             onChange={(e)=>{
              setfirstname(e.target.value)
             }}
              required
              placeholder="First name"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-3 w-1/2 text-base placeholder:text-sm"
            />
              <input
             type="text"
              required
              value={lastname}
              onChange={(e)=>{
                setlastname(e.target.value)
              }}
              placeholder="Last name"
              className="bg-[#eeeeee] mb-6 rounded px-4 py-3 w-1/2 text-base placeholder:text-sm"
            />
          </div>

          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-3 w-full text-base placeholder:text-sm"
          />
          {/* password */}

          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
            placeholder="Enter password"
            className="bg-[#eeeeee] mb-6 rounded px-4 py-3 w-full text-base placeholder:text-sm"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 px-4 py-3 w-full text-base placeholder:text-base rounded-sm">
            Sign up
          </button>

          <p className="text-center pb-5 text-lg">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600 ">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
      <p className="text-[12px] leading-6">By creating an account, you agree to our [Privacy Policy] and [Terms of Use]</p>
    </div>
  )
}

export default CaptainSignup