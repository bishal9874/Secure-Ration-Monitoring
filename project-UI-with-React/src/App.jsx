import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Layouts from "./Layouts";

import { useSelector } from "react-redux";
import Login from "./components/AuthScreens/login/Login";
import MainDashSection from "./components/Dashboard/MainDashSection/MainDashSection";
import FaceAuth from "./components/AuthScreens/FaceAuth/FaceAuth";
import Reg from "./components/AuthScreens/Registration/Reg";
import UserKyc from "./components/AuthScreens/userKYC/UserKyc";
import ResetPass from "./components/AuthScreens/Reset Pass/ResetPass";
function App() {
  const [count, setCount] = useState(0);
  const { access_token } = useSelector((state) => state.auth);
  const isFaceVerify = localStorage.getItem("isfaceVerify");
  console.log("face", isFaceVerify);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layouts />}></Route>
        <Route
          path="/login"
          element={
            access_token && isFaceVerify ? (
              <Navigate to="/logincam" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/logincam"
          element={
            access_token && isFaceVerify ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <FaceAuth />
            )
          }
        />
        <Route
          path="/userkyc"
          element={access_token ? <UserKyc /> : <Navigate to={"/signup"} />}
        />
        <Route path="/signup" element={access_token && isFaceVerify ? <Navigate to={"/dashboard"}/>:<Reg />} />
        <Route path="/dashboard" element={access_token ? <MainDashSection /> : <Navigate to={"/login"}/> }/>
        <Route path="api/user/reset/:id/:token" element={<ResetPass/>}/>
        {/* <Route path="reset/" element={<ResetPass/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { useState, useEffect, useRef } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   BrowserRouter,
//   Navigate,
// } from "react-router-dom";
// import Layouts from "./Layouts";

// import { useSelector } from "react-redux";
// import Login from "./components/AuthScreens/login/Login";
// import MainDashSection from "./components/Dashboard/MainDashSection/MainDashSection";
// import FaceAuth from "./components/AuthScreens/FaceAuth/FaceAuth";
// import Reg from "./components/AuthScreens/Registration/Reg";
// import UserKyc from "./components/AuthScreens/userKYC/UserKyc";

// function App() {
//   const { access_token } = useSelector((state) => state.auth);
//   const isFaceVerify = localStorage.getItem("isfaceVerify");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layouts />} />

//         <Route
//           path="/login"
//           element={
//             access_token && isFaceVerify ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Login />
//             )
//           }
//         />

//         <Route
//           path="/logincam"
//           element={
//             access_token && isFaceVerify ? (
//               <MainDashSection />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         <Route
//           path="/userkyc"
//           element={
//             access_token && isFaceVerify ? (
//               <MainDashSection />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         <Route
//           path="/signup"
//           element={
//             access_token && isFaceVerify ? (
//               <MainDashSection />
//             ) : (
//               <Reg />
//             )
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             access_token && isFaceVerify ? (
//               <MainDashSection />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
