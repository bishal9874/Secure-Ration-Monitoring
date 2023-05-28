import React, { useState, useEffect, useRef } from "react";
import "./Sidebar.css";
import Logo from "../../../assets/png/logo-no-background.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../../utils/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { removeToken, getToken } from "../../../API/localStorage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUsertoken } from "../../../features/authSlice";

const Sidebar = () => {
  // const { access_token, refresh_token, access_token_expiration } = getToken();
  // Retrieve the access token expiration from the cookie

  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  // const [remainingTime, setRemainingTime] = useState(0);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const intervalRef = useRef(null);
  const handleLogout = () => {
    // Perform logout actions here, such as clearing tokens, resetting state, etc.
    localStorage.removeItem("isfaceVerify");
    removeToken(); // Clear access and refresh tokens from cookies or storage
    navigate("/"); // Redirect the user to the login page
  };
  // const timeoutRef = useRef(null);
  // useEffect(() => {
  //   const checkTokenExpiration = () => {
  //     // Check if the access token exists and has expired
  //     if (access_token && access_token_expiration) {
  //       const expirationTime = access_token_expiration;
  //       const currentTime = new Date().getTime();

  //       const timeRemaining = expirationTime - currentTime;
  //       console.log("remaining time", timeRemaining);
  //       setRemainingTime(timeRemaining); // Update the remaining time in state
  //       if (timeRemaining <= 0) {
  //         handleLogout(); // Call the logout function when the access token has expired
  //       } else {
  //         timeoutRef.current = setTimeout(handleLogout, timeRemaining);
  //       }
  //     }
  //   };

  //   const startTimer = () => {
  //     intervalRef.current = setInterval(checkTokenExpiration, 1000); // Check expiration every second
  //   };

  //   const stopTimer = () => {
  //     clearInterval(intervalRef.current);
  //   };

  //   startTimer();

  //   checkTokenExpiration(); // Check token expiration immediately after mounting

  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //     // Cleanup the timeout on component unmount
  //     stopTimer(); //
  //   };
  // }, [access_token, access_token_expiration]);

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? (expanded ? "true" : "false") : ""}
      >
        {/* logo */}
        {/* <div className="logo">
          <img
            src={Logo}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
        </div> */}

        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}

          {/* <div className="menuItem">
            <UilSignOutAlt onClick={handleLogout} />
          </div> */}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
