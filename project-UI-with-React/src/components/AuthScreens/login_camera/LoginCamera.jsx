import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./LoginCam.css";
import { CameraAltOutlined,Padding,RefreshOutlined } from "@mui/icons-material";
const videoConstraints = {
  width: 540,
  facingMode: "user",
};

const LoginCamera = ({ onCapturePhoto }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    const blob = await (await fetch(imageSrc)).blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    if (typeof onCapturePhoto === "function") {
      onCapturePhoto(file);
    } else {
      console.error("onCapturePhoto is not a function");
    }
  }, [webcamRef, onCapturePhoto]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="paddings flexCenter cam-container">
        <div className="paddings canvasContainer">
          <div style={{ position: "relative" }}>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              onUserMedia={onUserMedia}
            />
            <button onClick={capturePhoto} className="button" style={{ position: "absolute", top: "350px", left: "10px" }}>
           <CameraAltOutlined style={{ fontSize: 24, color: 'white',padding:0}}/>
            </button>
            <button
            className="button"
            onClick={() => setUrl(null)}
              style={{ position: "absolute", top: "350px", right: "10px" }}
            >
              <RefreshOutlined/>
            </button>
          </div>
          {url && (
            <div className="flexCenter">
              <img src={url} alt="Screenshot" width={200} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginCamera;
// import React, { useRef, useEffect, useState } from "react";
// import Webcam from "react-webcam";
// import "./LoginCam.css";
// import { CameraAltOutlined, RefreshOutlined } from "@mui/icons-material";
// import * as faceapi from "face-api.js";

// const videoConstraints = {
//   width: 540,
//   facingMode: "user",
// };

// const LoginCamera = ({ onCapturePhoto }) => {
//   const webcamRef = useRef(null);
//   const [url, setUrl] = useState(null);
//   const [showCaptureButton, setShowCaptureButton] = useState(false);

//   useEffect(() => {
//     const loadModels = async () => {
//       await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//       await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
//       await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
//       await faceapi.nets.faceExpressionNet.loadFromUri('/models');
//     };
//     loadModels();
//   }, []);

//   const capturePhoto = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setUrl(imageSrc);
//     const blob = await (await fetch(imageSrc)).blob();
//     const file = new File([blob], "image.jpg", { type: "image/jpeg" });
//     if (typeof onCapturePhoto === "function") {
//       onCapturePhoto(file);
//     } else {
//       console.error("onCapturePhoto is not a function");
//     }
//   };

//   const detectFaces = async () => {
//     const detection = await faceapi.detectAllFaces(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions());
//     setShowCaptureButton(detection.length > 0);
//   };

//   const onUserMedia = () => {
//     detectFaces();
//   };

//   return (
//     <>
//       <div className="paddings flexCenter cam-container">
//         <div className="paddings canvasContainer">
//           <div style={{ position: "relative" }}>
//             <Webcam
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={videoConstraints}
//               onUserMedia={onUserMedia}
//             />
//             {showCaptureButton && (
//               <button
//                 onClick={capturePhoto}
//                 className="button"
//                 style={{ position: "absolute", top: "350px", left: "10px" }}
//               >
//                 <CameraAltOutlined style={{ fontSize: 24, color: "white", padding: 0 }} />
//               </button>
//             )}
//             <button
//               className="button"
//               onClick={() => {
//                 setUrl(null);
//                 setShowCaptureButton(false);
//               }}
//               style={{ position: "absolute", top: "350px", right: "10px" }}
//             >
//               <RefreshOutlined />
//             </button>
//           </div>
//           {url && (
//             <div className="flexCenter">
//               <img src={url} alt="Screenshot" width={200} />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginCamera;
