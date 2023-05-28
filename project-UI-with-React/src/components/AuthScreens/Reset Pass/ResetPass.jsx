import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PasswordPros from "../../../utils/PasswordPros";
import { useResetPasswordMutation } from "../../../API/rationApi";
import {
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";

const ResetPass = () => {
  const [server_error, setServerError] = useState({});
  const { id, token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [successSave,SetSuccess]=useState({})
  const navigate = useNavigate();
  const handleResetPass = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const resetPassData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const res = await resetPassword({ user: resetPassData, id, token });
    if (res.error) {
      console.log(res.error)
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(res.data);
      setServerError({});
      SetSuccess(res.data);
      setTimeout(()=>{navigate("/login")},3000)

    }
  };

  return (
    <div className="R_wrapper">
      <div className="flexCenter innerWidth paddings">
        <h3 className="primaryText" style={{ fontSize: "60px"  }}>
          Reset Password
        </h3>
      </div>
      <div className="flexCenter">
      {successSave.msg? (
          <Alert severity="success">{successSave.msg}</Alert>
        ) :        <Box component="form" onSubmit={handleResetPass}>
        <div className="inputs_container">
        {server_error.non_field_errors ? (
        <Alert severity="error">{server_error.non_field_errors[0]}</Alert>
      ) : (
        ""
      )}{" "}
          <PasswordPros
            id="password"
            name="password"
            label="New Password"
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
          <PasswordPros
            id="password2"
            name="password2"
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          {server_error.password2 ? (
           <Typography style={{ fontSize: 12, color: "red" }}>
             {" "}
             {server_error.password2[0]}
           </Typography>
         ) : null}
          <button className="button" style={{ marginTop: "10px", fontSize: "20px" }}>
            Save
          </button>

        </div>
      </Box> }

      </div>
    </div>
  );
};

export default ResetPass;
