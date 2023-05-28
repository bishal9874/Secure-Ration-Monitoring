import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import Login from "../AuthScreens/login/Login";

import { removeToken,getToken } from "../../API/localStorage";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import { unSetUsertoken } from "../../features/authSlice";
import { Button } from "@mui/material";
const Header = () => {
  const location = useLocation();
  const { access_token, refresh_token, access_token_expiration } = getToken();
  // Retrieve the access token expiration from the cookie

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const handleLogout = () => {
    // Perform logout actions here, such as clearing tokens, resetting state, etc.
    localStorage.removeItem("isfaceVerify");
    removeToken(); // Clear access and refresh tokens from cookies or storage
    navigate("/"); // Redirect the user to the login page
  };
  const timeoutRef = useRef(null);
  useEffect(() => {
    const checkTokenExpiration = () => {
      // Check if the access token exists and has expired
      if (access_token && access_token_expiration) {
        const expirationTime = access_token_expiration;
        const currentTime = new Date().getTime();

        const timeRemaining = expirationTime - currentTime;
        console.log("remaining time", timeRemaining);
        setRemainingTime(timeRemaining); // Update the remaining time in state
        if (timeRemaining <= 0) {
          handleLogout(); // Call the logout function when the access token has expired
        } else {
          timeoutRef.current = setTimeout(handleLogout, timeRemaining);
        }
      }
    };

    const startTimer = () => {
      intervalRef.current = setInterval(checkTokenExpiration, 1000); // Check expiration every second
    };

    const stopTimer = () => {
      clearInterval(intervalRef.current);
    };

    startTimer();

    checkTokenExpiration(); // Check token expiration immediately after mounting

    return () => {
      clearTimeout(timeoutRef.current);
      // Cleanup the timeout on component unmount
      stopTimer(); //
    };
  }, [access_token, access_token_expiration]);
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        {access_token && location.pathname === "/dashboard"? <>
        
        <img
          src="src/assets/png/secure-ration-dashboard-low-resolution-logo-color-on-transparent-background.png"
          alt="logo"
          width={180}
        />
        </> : <img
          src="src/assets/png/logo-no-background.png"
          alt="logo"
          width={150}
        />}

        <div className="flexCenter h-menu">
        {location.pathname === "/dashboard" ? <button className="button" onClick={() => (window.location.href = "/")} >Home</button>: <a href="#">Home</a> }
          
          
          {location.pathname === "/dashboard" ? null : (
            <>
              <a href="#companies">Companies</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </>
          )}
         {access_token ? "" :  <a href="/login">Sign in</a> }

         {access_token ? "": <button
            className="button"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </button> } 
          {location.pathname === "/dashboard" ? null : (
            <>
             {access_token ? (
            <button className="button" onClick={() => (window.location.href = "/dashboard")}>
              Dashboard
            </button>
          ) : (
            " "
          )}
            </>
          )}
          

          {access_token ? <><div className="remaining">
            <button className="button" onClick={handleLogout}> logout
              </button> 
          </div><div style={{justifyContent:"center",justifyItems:"center",alignItems:"center",fontFamily: "Nunito Sans",}}>
              {Math.floor(remainingTime / 60000)}:
            {Math.floor((remainingTime / 1000) % 60)
              .toString()
              .padStart(2, "0")} minutes
              </div></> :""}
        </div>
        
      </div>
      
    </section>
  );
};

export default Header;
