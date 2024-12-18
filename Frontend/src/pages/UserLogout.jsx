import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

// this is the main component of the application used to logout the user
const UserLogout = () => {
  const navigate = useNavigate();
  //the token is stored in the local storage
  const token = localStorage.getItem("token");
  //using axios to make a get request to the server to logout the user
  try{
   axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      //the token is sent in the headers of the request
      // the headers are used to send the token to the server
      // the authorization header is used to send the token to the server
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);

          if (response.status === 200) {
              localStorage.removeItem("token");
              navigate("/login");
            }
       
    });
}catch(err){
    console.log("not getting resp");
  }

//   console.log(response);
  

  return <div>UserLogout</div>;
};

export default UserLogout;
