import { StrictMode } from "react"; //the strict mode is used to check for any errors in the application
import { createRoot } from "react-dom/client"; //the createRoot is used to create the root element of the application here the root element is the div with the id root
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // the BrowserRouter is used to create the router in the application
import UserContext from "../context/UserContext.jsx"; //importing the usercontext from the context folder
import CaptainContext from "../context/CaptainContext.jsx";
createRoot(document.getElementById("root")).render(
  //creating the root element of the application this is the main entry point of the application and this is the root element with id root
  <StrictMode>
    {/* //the strict mode is used to check for any errors in the application */}
    <CaptainContext>
      <UserContext>
        {/* //the usercontext is used to store the data of the user */}
        <BrowserRouter>
          {/* //the BrowserRouter is used to create the router in the application and all the files that have been made and linked in app.jsx comes under browser root  */}
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
