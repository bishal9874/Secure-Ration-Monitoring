import React from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  Box,
  Alert,
  Typography,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import "./userKyc.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, removeToken, storeToken } from "../../../API/localStorage";
import { useUser_kycMutation } from "../../../API/rationApi";
import { useDispatch } from "react-redux";
import { setUsertoken } from "../../../features/authSlice";
import {
  states,
  districtsByState,
  village_town,
} from "../../../utils/CountryData";
const UserKyc = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const [kycuser, { isLoading }] = useUser_kycMutation(access_token);
  const [successData, setSuccessData]=useState({});
  const handlekycuser = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const kycData = {
      aadharcardNo: data.get("aadharNumber"),
      phoneNo: data.get("phNumber"),
      dateofbirth: data.get("date_of_birth"),
      gender: data.get("gender"),
      state: data.get("state"),
      district: data.get("district"),
      village: data.get("village"),
      houseNo: data.get("houseNo"),
      post_office: data.get("post_office"),
      pin: data.get("pin"),
      Annual_income: data.get("Annual_income"),
      fpsCode: data.get("fpsCode"),
    };
    console.log(kycData);
    const res = await kycuser(kycData);
    console.log(res);
    if (res.error) {
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      setSuccessData(res.data)
      // storeToken(res.data.token);
      // let { access_token } = getToken();
      // dispatch(setUsertoken({ access_token: access_token }));
      removeToken()
      setTimeout(()=>{navigate("/login")},5000)
    }
  };
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [villageTown, setVillage_town] = useState("");

  const handleStateChange = (event) => {
    setState(event.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };
  const handleVillageTown = (event) => {
    setVillage_town(event.target.value);
  };

  //Aadhar No varifiy

  return (
    <>
      <section className="u-wrapper">
        <div className=" flexCenter u-header">
          <img
            src="src/assets/png/logo-no-background.png"
            alt="logo"
            width={180}
            // onClick={handleLogout}
          />
          <p className="secondartText">
            Users should be required to provide their own KYC verification in
            order to register on this application
          </p>

          <button type="submit" className="button" form="userkyc-form">
            Join
          </button>
        </div>
      </section>
      <section className="flexCenter  uk-container">
        {/* <img src="src/assets/kyc.png" width={600} height={400} /> */}

        {successData.msg ? <Alert severity="success"> {successData.msg }</Alert>: <div className="userkyc_form">
          <Box
            as="form"
            id="userkyc-form"
            onSubmit={handlekycuser}
            // component="form"
            // id="userkyc-form"
            // onSubmit={handlekycuser}
            // sx={{
            //     "& .MuiTextField-root": { m: 1, width: "30ch" },

            //   }}
          >
            <section className="inputConatiner">
              <div className="l-input">
                {/* Aadhar card Number */}
                <TextField
                  margin="normal"
                  fullWidth
                  id="aadharNumber"
                  name="aadharNumber"
                  label="Aadhar Number"
                  inputProps={{
                    maxLength: 14,
                    pattern: "\\d{4} \\d{4} \\d{4}",
                    title:
                      "Please enter Aadhar number in format XXXX XXXX XXXX",
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newValue = value.replace(/[^0-9]/g, ""); // remove non-numeric characters
                    let formattedValue = "";
                    for (let i = 0; i < newValue.length; i++) {
                      if (i % 4 === 0 && i > 0) formattedValue += " "; // add space after every 4 characters
                      formattedValue += newValue[i];
                    }
                    e.target.value = formattedValue;
                  }}
                />
                  {server_error.aadharcardNo ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.aadharcardNo[0]}
                  </Typography>
                ) : (
                  " "
                )}
                {/* Phone number */}
                <TextField
                  margin="normal"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  id="phNumber"
                  name="phNumber"
                  inputProps={{ maxLength: 10 }}
                />
                {server_error.phoneNo ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.phoneNo[0]}
                  </Typography>
                ) : (
                  " "
                )}
                {/* date of Birth */}
                <TextField
                  margin="normal"
                  fullWidth
                  id="date_of_birth"
                  name="date_of_birth"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {server_error.dateofbirth ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.dateofbirth[0]}
                  </Typography>
                ) : (
                  " "
                )}
                {/* gender */}
                <FormControl component="fieldset" margin="normal">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup row aria-label="gender" name="gender">
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                {server_error.gender ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.gender[0]}
                  </Typography>
                ) : (
                  " "
                )}
                {/* state */}
                <Select
                  className="input-field select-field"
                  value={state}
                  onChange={handleStateChange}
                  displayEmpty
                  fullWidth
                  id="state"
                  name="state"
                  label="State"
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>

                {/* Add margin */}
                <div className="field-gap">
                {server_error.state ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.state[0]}
                  </Typography>
                ) : (
                  " "
                )}
                </div>

                {/* district */}
                {state && (
                  <Select
                    className="input-field select-field"
                    value={district}
                    onChange={handleDistrictChange}
                    displayEmpty
                    fullWidth
                    id="district"
                    name="district"
                    label="District"
                  >
                    <MenuItem value="" disabled>
                      Select District
                    </MenuItem>
                    {districtsByState[state].map((district) => (
                      <MenuItem key={district} value={district}>
                        {district}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {server_error.district ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.district[0]}
                  </Typography>
                ) : (
                  " "
                )}
              </div>
              
              <div className="r-input">
                {/* Add margin */}
                <div className="field-gap"></div>

                {/* village */}
                {district && (
                  <Select
                    className="input-field select-field"
                    value={villageTown}
                    onChange={handleVillageTown}
                    displayEmpty
                    fullWidth
                    id="village"
                    name="village"
                    label="Village/Town"
                  >
                    <MenuItem value="" disabled>
                      Select Village/Town
                    </MenuItem>
                    {village_town[district].map((villageTown) => (
                      <MenuItem key={villageTown} value={villageTown}>
                        {villageTown}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {server_error.village ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.village[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="houseNo"
                  name="houseNo"
                  label="House No"
                />
                {server_error.houseNo ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.houseNo[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="post_office"
                  name="post_office"
                  label="Post Office"
                />
                {server_error.post_office ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.post_office[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="pin"
                  name="pin"
                  label="pin"
                />
                {server_error.pin ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.pin[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="Annual_income"
                  name="Annual_income"
                  label="Annual_income"
                />
                {server_error.Annual_income ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.Annual_income[0]}
                  </Typography>
                ) : (
                  " "
                )}
                <TextField
                  margin="normal"
                  fullWidth
                  id="fpsCode"
                  name="fpsCode"
                  label="FPS (Fair Price Shop) Code "
                />
                {server_error.fpsCode ? (
                  <Typography
                    style={{ fontSize: 12, color: "red", textAlign: "center" }}
                  >
                    {" "}
                    {server_error.fpsCode[0]}
                  </Typography>
                ) : (
                  " "
                )}
              </div>
            </section>

            {server_error[0] ? (
              <Alert severity="error">{server_error[0]}</Alert>
            ) : (
              ""
            )}
          </Box>
        </div>}
      </section>
    </>
  );
};

export default UserKyc;
