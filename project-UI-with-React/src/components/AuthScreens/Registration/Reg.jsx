import React from "react";
import Camera from "../camera/Camera";
import "./Reg.css";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignUp_userMutation } from "../../../API/rationApi";
import { storeToken, getToken } from "../../../API/localStorage";
import { setUsertoken } from "../../../features/authSlice";
import PasswordPros from "../../../utils/PasswordPros";
import Footer from "../../Footer/Footer";

const Reg = () => {
  const [server_error, setServerError] = useState({});
  const [faceurl, setfaceUrl] = React.useState(null);
  const [imageData, setImageData] = useState(null); // define state variable to hold captured image data
  const [isCameraReady, setIsCameraReady] = useState(false);
  const dispatch = useDispatch();
  const onCapturePhoto = (imageData) => {
    setImageData(imageData);
    setIsCameraReady(true); // update the state with the captured image data
  };
  // console.log(imageData);
  console.log(imageData);
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useSignUp_userMutation();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // data.append('face_image', imageData);
    const registationData = {
      email: data.get("email"),
      name: data.get("name"),
      rationId: data.get("rationId"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
      face_image: imageData,
    };
    const res = await registerUser(registationData);
    if (res.error) {
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUsertoken({ access_token: access_token }));
      navigate("/userkyc");
    }
  };

  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }));
  }, [access_token, dispatch]);

  //Ration Input Type

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
          {server_error.non_field_errors ? (
            <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
          ) : (
            ""
          )}
          <p className="already_register">
            I have already register?{" "}
            <a href="/login" className="login_butt">
              login
            </a>{" "}
          </p>
        </div>
      </section>
      <div className="r-wrapper">
        <section className="paddings flexCenter innerWidth r-container">
          <div>
            <h3 className="flexStart primaryText">Join with Us!</h3>
            <h1 className="secondaryText">Register to Continue</h1>
            <Box
              component="form"
              id="registration-form"
              onSubmit={handlesubmit}
            >
              <div className="inputs_container">
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  id="email"
                  variant="outlined"
                  margin="normal"
                />
                {server_error.email ? (
                  <Typography style={{ fontSize: 12, color: "red" }}>
                    {server_error.email[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  type="text"
                  name="name"
                  id="name"
                  label="Name"
                  variant="outlined"
                  margin="normal"
                />
                {server_error.name ? (
                  <Typography style={{ fontSize: 12, color: "red" }}>
                    {server_error.name[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  type="text"
                  name="rationId"
                  id="rationId"
                  label="Ration ID (RKSY I/II XXXXXXXXXX)"
                  variant="outlined"
                  margin="normal"
                  
                />
                {server_error.rationId ? (
                  <Typography style={{ fontSize: 12, color: "red" }}>
                    {server_error.rationId[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <PasswordPros
                  type="password"
                  name="password"
                  id="password"
                  label="Password"
                  variant="outlined"
                  margin="normal"
                />
                {server_error.password ? (
                  <Typography style={{ fontSize: 12, color: "red" }}>
                    {server_error.password[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <PasswordPros
                  type="password"
                  name="password2"
                  id="password2"
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                />
                {server_error.password2 ? (
                  <Typography style={{ fontSize: 12, color: "red" }}>
                    {server_error.password2[0]}
                  </Typography>
                ) : (
                  " "
                )}
              </div>
              <Box display="flex" flexDirection="column">
                <Box display="flex" alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="true"
                        color="primary"
                        name="tc"
                        id="tc"
                      />
                    }
                    label="I agree to term and condition."
                  />
                  {server_error.tc ? (
                    <Typography style={{ fontSize: 12, color: "red" }}>
                      {server_error.tc[0]}
                    </Typography>
                  ) : (
                    " "
                  )}
                </Box>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <button type="submit" className="login_button">
                    Sign Up
                  </button>
                )}
              </Box>
            </Box>
          </div>
          <div>
            <Camera onCapturePhoto={onCapturePhoto} />
            {server_error.face_image ? (
              <span style={{ fontSize: 12, color: "red" }}>
                {" "}
                {server_error.face_image[0]}
              </span>
            ) : (
              " "
            )}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Reg;
