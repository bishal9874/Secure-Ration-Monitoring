import React from "react";
import "./Login.css";
import { useState } from "react";
import {
  TextField,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogin_userMutation } from "../../../API/rationApi";

import { getToken, storeToken } from "../../../API/localStorage";
import { setUsertoken } from "../../../features/authSlice";
import { useEffect } from "react";
import PasswordPros from "../../../utils/PasswordPros";
import Footer from "../../Footer/Footer";
import PopUp from "../../Dashboard/Popup/PopUp";
import Forgetpassword from "../forgetpassword/Forgetpassword";
const Login = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLogin_userMutation();
  const [showforget,setShowForget] =useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const loginData = {
      email: data.get("email"),
      rationId: data.get("rationId"),
      password: data.get("password"),
    };

    const res = await loginUser(loginData);
    if (res.error) {
      console.log(res);
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUsertoken({ access_token: access_token }));
      navigate("/logincam");
    }
  };

  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }));
  }, [access_token, dispatch]);

  const handleCloseForget = () => {
    setShowForget(false);
  };

  return (
   <>
    <section className="l-wrapper">
      <div className="paddings flexCenter innerwidth l-header-container">
        <a href="/">
        <img
          src="src/assets/png/logo-no-background.png"
          alt="logo"
          width={180}
        />
        </a>
        {server_error.none_field_errors ? (
          <Alert severity="error">{server_error.none_field_errors[0]}</Alert>
        ) : (
          ""
        )}{" "}
        <p>
          New User?{" "}
          <a href="/Signup" className="register_button">
            KYC Sign Up
          </a>{" "}
        </p>
      </div>
   
    </section>
     <section className="paddings flexCenter innerWidth l-container">
     <img src="src/assets/people-login.png" alt="login illutrations" width={750}/>

      <div >
      
       <h3 className="flexStart primaryText">Welcome Back !</h3>
       <h1 className="secondaryText">Login to Continue</h1>
      <Box component="form" onSubmit={handleLogin}>
         <div className="inputs_container">
           <TextField
             id="email"
             name="email"
             label="Email"
             variant="outlined"
             margin="normal"
           />
           {server_error.email ? (
             <Typography style={{ fontSize: 12, color: "red" }}>
               {" "}
               {server_error.email[0]}
             </Typography>
           ) : null}
           <TextField
             id="rationId"
             name="rationId"
             label="Ration ID"
             variant="outlined"
             margin="normal"
             
           />
           {server_error.rationId ? (
             <Typography style={{ fontSize: 12, color: "red" }}>
               {" "}
               {server_error.rationId[0]}
             </Typography>
           ) : null}
           <PasswordPros
             id="password"
             name="password"
             label="Password"
             type="password"
             variant="outlined"
             margin="normal"
           />
           {server_error.password ? (
             <Typography style={{ fontSize: 12, color: "red" }}>
               {" "}
               {server_error.password[0]}
             </Typography>
           ) : null}
         </div>
         <div className="flexCenter login_butto_section ">
         {isLoading ? (
         <CircularProgress />
       ) : (
         <button type="submit" className="login_button" >
           login
         </button>
       )}

       <a style={{alignContent:"center", cursor:"pointer"}} onClick={() => setShowForget(true)}>forget password</a>
         </div>
       
       </Box>
       
      </div>
      {showforget && <Forgetpassword trigger={showforget} onClose={handleCloseForget}></Forgetpassword>}

   </section>
   <Footer/>
   
   </>
  );
};

export default Login;
