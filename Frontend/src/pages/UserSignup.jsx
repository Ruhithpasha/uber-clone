import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios' // importing the axios library to make the api requests
// import userdataContext from "../../context/UserContext";
// import UserContext from '../../context/UserContext.jsx' 
import { userdataContext } from '../../context/UserContext.jsx'
// this is the signup page for the user

const UserSignup = () => {
  // using the useState hook to store the email and password
  // the usestate hook is used to store the state of the component
  
   
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState("");
  const [userData, setuserData] = useState('')

// the below line of code is used to get the data of the user from the usercontext using the useContext hook and stored in the user object
  const {user, setuser} = React.useContext(userdataContext)
  // console.log(user);
  
// the navigate hook is used to navigate to the different routes in the application
  const navigate = useNavigate()




  const submitHandler= async (e)=>{
    e.preventDefault()
    //Email  password, firstname and lastname  are set to empty after the form is submitted 
    setEmail("");
    setpassword("");
    setfirstname("");
    setlastname("");
    console.log(firstname, lastname, email, password);
    
    // the new user object is created and the data is stored in the newUser object
   const newUser = {
    fullName:{
      firstName:firstname,
      lastName:lastname,
    },
    email:email,
    password:password
   }
    console.log(userData);

    // the data created or stored in newUser objectis sent to the api using the axios post request to the backend

    //to get the response from the backend we use the await keyword and the response is stored in the response variable

    try{
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`,newUser)
    
    if (response.status ===201) {
      const data = response.data
      // the user data is set in the usercontext and the user is navigated to the home page
      setuser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
      
    }      
    }catch(error){
      console.error("Error during registration:", error.response ? error.response.data : error.message);
    } 

  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-24 mb-5"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
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
            <Link to="/login" className="text-blue-600 ">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
      <p className="text-[12px] leading-6">By creating an account, you agree to our [Privacy Policy] and [Terms of Use]</p>
    </div>
  );
};

export default UserSignup;


// steps to create the user signup page and connect it to the backend
// step 1: create a new file called UserSignup.jsx in the pages folder of the frontend
// step 2: import the necessary dependencies and hooks from react and react-router-dom
// step 3: create a functional component called UserSignup
// step 4: create state variables to store the user data (email and password, FIRSTNAME, LASTNAME)
// step 5: create a function called submitHandler to handle the form submission
// step 6: create a form with input fields for email and password, FIRSTNAME, LASTNAME
// step 7: add event handlers to update the state variables when the input fields change , eventhandles means the function that is called when the event occurs the submithandler function is the event handler in this case
// step 8: add a submit button to the form and call the submitHandler function when the form is submitted
// step 9: add a link to the login page if the user already has an account
// step 10: export the UserSignup component
// step 11: import the UserSignup component in the App component
// step 12: add a route for the UserSignup component in the App component
// step 13: test the user signup page in the browser

//to connect it to the backend

//step 1: import the axios library to make api requests
//step 2: create a new state variable to store the user data from the backend
//step 3: import the UserContext from the context folder
//step 4: use the useContext hook to get the user data from the UserContext
//step 5; use the navigate hook to navigate to the home page after the user is signed up
//step 6: in the submitHandler function, create a new user object with the email and password,firstname and lastname
//step 7: make a post request to the backend api with the user data using the axios library and the post method by taking the url from the .env file 
//step 8: if the response status is 201, set the user data in the UserContext and navigate to the home page
