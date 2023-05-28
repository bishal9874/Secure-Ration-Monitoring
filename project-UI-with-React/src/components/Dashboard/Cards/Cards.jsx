import { React, useState } from "react";
import "./Cards.css";
import { Typography } from "@mui/material";
import useUserData from "../../../utils/useUserData";
import PopUp from "../Popup/PopUp";
import ChangedPass from "../change password/ChangedPass";

const Cards = () => {
  const { userData, userKYCData, userRationDetails } = useUserData();
  const [showPopup, setShowPopup] = useState(false);
  const [showchngpass, setshowchngpass] = useState();
  const openPopup = () => {
    setShowPopup((prevShowPopup) => !prevShowPopup);
  };

  const openChangedpassword = () => {
    setshowchngpass((prevShowPopup) => !prevShowPopup);
  };
  console.log(showPopup);
  const namestrlen = userData.name.length;
  return (
    <section className="d-Wraper">
      <div className="l_Cards">
        <div className="lcard CompactCard">
          <Typography variant={namestrlen <= 10 ? "h2" : "h4"} color={"black"}>
            {userData.name}
          </Typography>
          <Typography variant="h7" color={"black"} fontWeight={"bold"}>
            Email{" "}
            <span style={{ padding: "5px", color: "black", fontWeight: "400" }}>
              {userData.email}
            </span>{" "}
          </Typography>
          <Typography variant="h7" color={"black"} fontWeight={"bold"}>
            Ration Id{" "}
            <span style={{ padding: "5px", color: "black", fontWeight: "400" }}>
              {userData.rationId}
            </span>{" "}
          </Typography>
          <Typography variant="h7" color={"black"} fontWeight={"bold"}>
            FPS Code (fare price shop){" "}
            <span
              style={{
                padding: "5px",
                color: "black",
                fontWeight: "400",
                fontFamily: "Nunito Sans",
              }}
            >
              {userKYCData.fpsCode}
            </span>{" "}
          </Typography>
          <button
            className="buttonhovering button "
            style={{ marginTop: "5px" }}
            onClick={openChangedpassword}
          >
            Account Password Change
          </button>
          {showchngpass && (
            <PopUp trigger={showchngpass}>
              <ChangedPass />{" "}
            </PopUp>
          )}
        </div>
      </div>
      <div className=" R_Cards">
        <div className="rcard CompactCard">
          <Typography variant="h7">
            {" "}
            <img
              src="src/assets/icons/id-card.png"
              width={20}
              height={20}
            />{" "}
            <span style={{ fontWeight: "bold" }}>Aadhar No : </span>
            <span
              style={{
                padding: "5px",
                color: "black",
                fontWeight: "bold",
                fontFamily: "Nunito Sans",
              }}
            >
              {userKYCData.aadharcardNo}
            </span>{" "}
          </Typography>
          <Typography variant="h7" color={"black"}>
            <img src="src/assets/icons/smartphone.png" width={20} />{" "}
            <span style={{ fontWeight: "bold" }}>Phone No: </span>
            <span
              style={{
                padding: "5px",
                color: "black",
                fontWeight: "400",
                fontFamily: "Nunito Sans",
              }}
            >
              {userKYCData.phoneNo}
            </span>{" "}
          </Typography>
          <div className="location" onClick={openPopup}>
            <img
              src="src/assets/icons/location-pin.png"
              width={60}
              height={60}
              style={{ marginTop: "12px" }}
            />
            <span>click here </span>
          </div>

          {showPopup && (
            <PopUp trigger={showPopup}>
              <div className="location_information">
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>State : </span>
                  {userKYCData.state}
                </Typography>
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>District : </span>
                  {userKYCData.district}
                </Typography>
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Village : </span>
                  {userKYCData.village}
                </Typography>
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>HouseNo : </span>
                  {userKYCData.houseNo}
                </Typography>
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Post Office : </span>
                  {userKYCData.post_office}
                </Typography>
                <Typography variant="h5" color={"black"}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Pin : </span>
                  {userKYCData.pin}
                </Typography>
              </div>
            </PopUp>
          )}
        </div>
        <div className="">
          <h4>CARD TYPE</h4>
          <Typography
            variant="h4"
            className="CardType"
            style={{
              color: "blue",
              textAlign: "center",
            }}
          >
            {userRationDetails.cardType}
          </Typography>
        </div>
      </div>
      <div>
        <img
          className="profileImage"
          src={`data:image/jpeg;base64,${userData.face_image}`}
        />
      </div>
    </section>
  );
};

export default Cards;