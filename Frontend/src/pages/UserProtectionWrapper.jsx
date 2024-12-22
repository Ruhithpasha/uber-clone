// import React, { useEffect } from "react";
// import { useContext, useState } from "react";
// import { userdataContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const UserProtectionWrapper = ({ children }) => {
//   const { user, setuser } = React.useContext(userdataContext);
//   const [isLoading, setisLoading] = useState(true);

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   console.log(token);

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//     }
//   }, [token]);

//   axios
//     .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         setuser(response.data.user);
//         setisLoading(false);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       localStorage.removeItem("token");
//       navigate("/login");
//     });

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   return <>{children}</>;
// };

// export default UserProtectionWrapper;






// chat gpt code


import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userdataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectionWrapper = ({ children }) => {
  const { user, setuser } = useContext(userdataContext);
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);

  const token = localStorage.getItem("token");
  console.log(token);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return; // Prevent further code execution if no token
    }

    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          setuser(response.data.user);  // Set the user in context
          setisLoading(false);  // Stop loading after the data is fetched
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");  // Clear token if error occurs
        setisError(true);  // Set error state
        navigate("/login");  // Redirect to login
      }
    };

    fetchUserProfile();
  }, [token, navigate, setuser]);  // Only re-run when `token` changes

  if (isLoading) {
    return <div>Loading ...</div>;  // Show loading message while fetching data
  }

  if (isError) {
    return <div>Error occurred. Redirecting to login...</div>;  // Show error message
  }

  return <>{children}</>;  // Render children if user is authenticated and data is loaded
};

export default UserProtectionWrapper;

