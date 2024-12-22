import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// this is the signup page for the captain
const CaptainSignup = () => {
  // using the useState hook to store the email and password
  // the usestate hook is used to store the state of the component
  // the state of component means the data that is stored in the component
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [userData, setuserData] = useState("");

  const [vehicleColour, setVehicleColour] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setEmail("");
    setpassword("");
    setfirstname("");
    setlastname("");
    setVehicleCapacity("");
    setVehicleColour("");
    setVehiclePlate("");
    setVehicleType("");
    console.log(firstname, lastname, email, password);
    // storing the data in the userData object and the userData object is stored in the userData state
    const newCaptain = {
      fullName: {
        firstName: firstname,
        lastName: lastname,
      },
      email: email,
      password: password,
      vehicle:{
        vehicleType:vehicleType,
        colour:vehicleColour,
        plate:vehiclePlate,
        capacity:vehicleCapacity
      }
    }
    console.log({ userData });

     try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/register`, newCaptain);
        
        if (response.status === 201) {
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem("token", data.token);
          navigate('/CaptainHome')
          
        }
        
     } catch (error) {
       console.log("there is an error",error);
      
     }

  };

  return (
    <div className="px-4 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-24 mb-0"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2">What's your name</h3>
          <div className="flex gap-2 justify-between  ">
            <input
              type="text"
              value={firstname}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
              required
              placeholder="First name"
              className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => {
                setlastname(e.target.value);
              }}
              placeholder="Last name"
              className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            />
          </div>

          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="email@example.com"
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-base placeholder:text-sm"
          />
          {/* password */}

          <h3 className="text-lg mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            required
            placeholder="Enter password"
            className="bg-[#eeeeee] mb-4 rounded px-4 py-2 w-full text-base placeholder:text-sm"
          />
          <h3 className="text-lg mb-2">Enter Vehicle Details</h3>
          <div className="flex gap-4 mb-2">
            {/* <input
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              placeholder="Vehicle Type"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            /> */}
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base"
            >
              <option value="" className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm" >Vehicle type</option>
              <option value="auto">Auto</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
            <input
              type="text"
              value={vehicleColour}
              onChange={(e) => setVehicleColour(e.target.value)}
              required
              placeholder="Vehicle Color"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            />
            </div>
            <div className="flex gap-4 mb-2">
            <input
              type="text"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              placeholder="Vehicle Plate Number"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            />
            <input
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              placeholder="Vehicle Capacity"
              className="bg-[#eeeeee] mb-3 rounded px-4 py-2 w-1/2 text-base placeholder:text-sm"
            />
            </div>
          <button className="bg-[#111] text-white font-semibold mb-1 px-4 py-2 w-full text-base placeholder:text-base rounded-sm">
            Sign up
          </button>

          <p className="text-center pb-5 text-base">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600 ">
              {" "}
              Login here
            </Link>
          </p>
        </form>
      </div>
      <p className="text-[12px] leading-6">
        By creating an account, you agree to our [Privacy Policy] and [Terms of
        Use]
      </p>
    </div>
  );
};

export default CaptainSignup;
