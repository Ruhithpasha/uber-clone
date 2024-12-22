import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import { userdataContext } from "../context/UserContext"; 
// import UserContext from "../context/UserContext";
import Home from "./pages/Home";
// import UserProtectionWrapper from "../pages/UserProtectionWrapper";
import UserProtectionWrapper from "./pages/UserProtectionWrapper.jsx"
import UserLogout from "./pages/UserLogout.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import CaptainProtectionWrapper from "./pages/CaptainProtectionWrapper.jsx";
//importing the usercontext from the context folder
// this is the main component of the application
const App = () => {
  const ans = useContext(userdataContext); //using the useContext hook to get the data from the usercontext 
  // the useContext hook is used to get the data from the context
  console.log(ans);

  return (
    <div>
      {/* // using the Routes and Route component from react-router-dom to create the routes */}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/home" element={
          <UserProtectionWrapper>
          <Home />
          </UserProtectionWrapper>} />

          <Route path="/CaptainHome" element={
          <CaptainProtectionWrapper>

            <CaptainHome />
          </CaptainProtectionWrapper>
         
          } />

          <Route path="/user/logout" element={
            <UserProtectionWrapper>
            <UserLogout />
            </UserProtectionWrapper>
            } 
            />
            
      </Routes>
    </div>
  );
};

export default App;
