import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";
const CaptainProtectionWrapper = ({ children }) => {
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const [isLoading, setisLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

// Fetch user profile data
const fetchCaptainsProfile = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.status === 200) {
      setCaptain(response.data.captain);  // Set the user in context
      setisLoading(false);  // Stop loading after the data is fetched
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem("token");  // Clear token if error occurs
    setisError(true);  // Set error state
    navigate("/captain-login");  // Redirect to login
  }
};

fetchCaptainsProfile();
}, [token, navigate, setCaptain]);  // Only re-run when `token` changes




  // axios
  //   .get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       setCaptain(response.data.captain);
  //       setisLoading(false);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     localStorage.removeItem("token");
  //     navigate("/captain-login");
  //   });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectionWrapper;
