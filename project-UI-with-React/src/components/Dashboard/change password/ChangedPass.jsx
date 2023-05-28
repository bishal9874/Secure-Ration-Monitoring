import React, { useState } from "react";
import PopUp from "../Popup/PopUp";
import {
    TextField,
    Box,
    Alert,
    Typography,
    CircularProgress,
  } from "@mui/material";
import PasswordPros from "../../../utils/PasswordPros";
import { getToken } from "../../../API/localStorage";
import { useChangepasswordMutation } from "../../../API/rationApi";
const ChangedPass = () => {
    const [server_error,setServerError] =useState({})
    const [ success_data,setSuccessdata] =useState({})
    const {access_token} = getToken();
    const [changepass,{isLoading}]=useChangepasswordMutation(access_token);
    const handlepasswordChng = async (e) => {
        e.preventDefault();
    
        const data = new FormData(e.currentTarget);
        const passwordChangeData = {
          password: data.get("password"),
          password2: data.get("password2")
        };
        console.log(passwordChangeData);
        const res = await changepass(passwordChangeData);
        console.log(res);
        if(res.error){
          setSuccessdata({})
          console.log(res.error.data.errors);
          setServerError(res.error.data.errors); 
        }
        if(res.data){
            console.log(res.data);
            setServerError({})
            document.getElementById("password_change").reset()
            setSuccessdata(res.data);
        }
        // const res = await loginUser(loginData);
        // if (res.error) {
        //   console.log(res);
        //   console.log(res.error.data.errors);
        //   setServerError(res.error.data.errors);
        // }
        // if (res.data) {
        //   console.log(res.data);
        // }
      };

  return (
    <div>
        <span className="primaryText">Changed Password</span>
      <Box component="form" id="password_change" onSubmit={handlepasswordChng}>
         <div className="inputs_container" style={{margin:"20px"}}>
         <PasswordPros
             id="password"
             name="password"
             label="Password"
             type="password"
             variant="outlined"
             margin="normal"
           />
           {server_error.password ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.password[0]}
                  </Typography>
                ) : (
                  " "
                )}
           <PasswordPros
             id="password2"
             name="password2"
             label="Confrim Password"
             type="password"
             variant="outlined"
             margin="normal"
           />
           {server_error.password2 ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.password2[0]}
                  </Typography>
                ) : (
                  " "
                )}
         </div>
         <div className="flexCenter" style={{marginTop:"10px"
        }}>
         {isLoading ? (
         <CircularProgress />
       ) : (
        <button type="submit" className="button">
           Submit
         </button>
       )}
        
         </div>
         
       </Box>
       <div style={{margin:"20px"}}>
       {server_error.non_field_errors ? (
          <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
        ) : (
          ""
        )}{" "}
        {success_data.msg ? (
          <Alert severity="success">{success_data.msg}</Alert>
        ) : (
          ""
        )}{" "}
       </div>
    </div>
  );
};

export default ChangedPass;