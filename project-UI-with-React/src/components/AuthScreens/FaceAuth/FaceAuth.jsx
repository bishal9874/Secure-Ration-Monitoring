import React from "react";
import "./FaceAuth.css";
import { useState, useEffect } from "react";
import LoginCamera from "../login_camera/LoginCamera";
import { useFaceVerify_userMutation } from "../../../API/rationApi";
import { CircularProgress, Typography, Alert } from "@mui/material";
import { getToken, storeToken, getverify,removeToken} from "../../../API/localStorage";
import { useDispatch } from "react-redux";
import { setUsertoken, unSetUsertoken } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

const FaceAuth = () => {
  const [imageData, setImageData] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [server_error, setServerError] = useState({});
  const [conditionalserver_error, setconditionalServerError] = useState({});
  const [faceVerifyUser, { isLoading }] = useFaceVerify_userMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const onCapturePhoto = (imageData) => {
    setImageData(imageData);
    setIsCameraReady(true);
    console.log(imageData); // update the state with the captured image data
  };

  const handleLogout = () => {
    dispatch(unSetUsertoken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  
  const handlesubmit = async (e) => {
    e.preventDefault();

    const loginFaceVerifyData = {
      face_image: imageData,
    };
    const res = await faceVerifyUser(loginFaceVerifyData);
    console.log(res);
    if (res.error) {
      setServerError(res.error.data);
    } else if (res.data) {
      storeToken(res.data.token);
      console.log(res.data.isfaceVerify);
      localStorage.setItem('isfaceVerify', res.data.isfaceVerify);
      let { access_token } = getToken();
      dispatch(setUsertoken({ access_token: access_token }));
      navigate("/dashboard");
    }
  };

  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <section>
      <div className="flexCenter innerwidth f-header-container">
        <img
          src="src/assets/png/logo-no-background.png"
          alt="logo"
          width={180}
          onClick={handleLogout}
        />
        {server_error.errors && server_error.errors.non_field_errors ? (
          <Alert severity="error">
            {server_error.errors.non_field_errors[0]}
          </Alert>
        ) : (
          ""
        )}
        {server_error.detail ? (
          <Alert severity="error">{server_error.detail}</Alert>
        ) : (
          ""
        )}
        <form onSubmit={handlesubmit}>
          {/* your form elements here */}
          {isLoading ? (
            <CircularProgress />
          ) : (
            <button type="submit" className="face_auth_button">
              Verify
            </button>
          )}
        </form>
      </div>
     <section>
     
     <div className="flexCenter innerWidth f-body">
        <p className="primaryText">You have to Capture your face only</p>
         <LoginCamera onCapturePhoto={onCapturePhoto} />
        {server_error.errors && server_error.errors.face_image ? (
          <Typography style={{ fontSize: 12, color: "red" }}>
            {" "}
            {server_error.errors.face_image[0]}
          </Typography>
        ) : (
          " "
        )}
        
      </div>
     </section>
    </section>
  );
};

export default FaceAuth;
