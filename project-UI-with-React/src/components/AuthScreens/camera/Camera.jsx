import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./Camera.css";
import {
  CameraAltOutlined,
  Padding,
  RefreshOutlined,
} from "@mui/icons-material";

const videoConstraints = {
  width: 540,
  facingMode: "user",
};

const Camera = ({ onCapturePhoto }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
  
    setUrl(imageSrc);
    const blob = await (await fetch(imageSrc)).blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    onCapturePhoto(file);
  }, [webcamRef, onCapturePhoto]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="paddings flexCenter cam-container">
        <div className="paddings canvasContainer">
          <div style={{ position: "relative" }}>
          {url ? <div >
            <img src={url} alt="Screenshot" width={540} />
          </div> : <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
            /> } 
            {url ? " " : <button
              onClick={capturePhoto}
              className="button"
              style={{ position: "absolute", top: "350px", left: "10px" }}
            >
              <CameraAltOutlined
                style={{ fontSize: 24, color: "white", padding: 0 }}
              />
            </button>}
            <button
              className="button"
              onClick={() => setUrl(null)}
              style={{ position: "absolute", top: "350px", right: "10px" }}
            >
              <RefreshOutlined />
            </button>
          </div>
          {/* {url && (
            
          )} */}
        </div>
      </div>
    </>
  );
};

export default Camera;
