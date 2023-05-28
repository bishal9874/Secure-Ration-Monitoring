import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./Forgetpassword.css";
import { useForget_passwordMutation } from "../../../API/rationApi";
import { Margin } from "@mui/icons-material";

const Forgetpassword = ({ trigger, onClose, children }) => {
  const [showForgetPopup, setShowForgetPopup] = useState(trigger);

  useEffect(() => {
    setShowForgetPopup(trigger);
  }, [trigger]);

  const handleClose = () => {
    onClose();
  };
  const [server_error, setServerError] = useState({});
  const [success_data, setSuccessData] = useState({});
  const [forgetPass, { isLoading }] = useForget_passwordMutation();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  const handleforgetPass = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const forgetPassData = {
      email: data.get("email"),
    };
    console.log(forgetPassData);
    const res = await forgetPass(forgetPassData);
    if (res.error) {
      console.log(res);
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      setSuccessData(res.data);
    }
  };

  return showForgetPopup ? (
    <>
    <div className="forgetpopUp" onClick={handleClose} />
    {isLoading ? (
      <CircularProgress style={{ color: "white",display:"flex", justifyContent:"center" }} />
    ) : (
      <>
        {success_data.msg ? (
          <Alert className="forget_popup-inner" severity="success" style={{ marginLeft: "10px" ,zIndex:9999,marginTop:"0"}}>
            {success_data.msg}
          </Alert>
        ) : (
          <div className="forget_popup_inner">
            <img
              src="src/assets/icons/close.png"
              className="buttonalign"
              alt="close"
              width={20}
              height={20}
              onClick={handleClose}
            />
  
            <div className="forget_popup-content">
              <span className="primaryText">Forget Password</span>
              <Box component="form" onSubmit={handleforgetPass}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  color={server_error.email ? "error" : ""}
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "15px",
                  }}
                />
  
                {server_error.email && (
                  <Typography
                    style={{ fontSize: 12, color: "red", marginTop: "5px" }}
                  >
                    {server_error.email[0]}
                  </Typography>
                )}
  
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="button"
                    style={{ padding: "10px", marginTop: "25px" }}
                  >
                    Submit
                  </button>
                </div>
              </Box>
              <div style={{ marginTop: "8px" }}>
                {server_error.non_field_errors ? (
                  <Alert severity="error">
                    {server_error.non_field_errors[0]}
                  </Alert>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </>
  
  ) : null;
};

export default Forgetpassword;
