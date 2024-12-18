import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import { userdataContext } from "../context/UserContext"; //importing the usercontext from the context folder
// this is the main component of the application
const App = () => {
  const ans = useContext(userdataContext); //using the useContext hook to get the data from the usercontext 
  // the useContext hook is used to get the data from the context
  console.log(ans);

  return (
    <div>
      {/* // using the Routes and Route component from react-router-dom to create the routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </div>
  );
};

export default App;
