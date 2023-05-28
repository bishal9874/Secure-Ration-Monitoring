import { Button, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../../API/localStorage';
import Navber from '../navber/Navber';
import './Dashboard.css'
import { useGetLogged_userQuery } from '../../API/rationApi';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setUsertoken,unSetUsertoken } from '../../features/authSlice';
const Dashboard = () => {
  const navigate = useNavigate()
  const {access_token} = getToken()
  const {data, isSuccess} = useGetLogged_userQuery(access_token)
  console.log(data)
  // Assuming face_image_data is the binary image data
  // const base64Data = btoa(String.fromCharCode(...new Uint8Array()));
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    email:"",
    name:"",
    rationId:"",
    face_image:"",
  })
  const [userKYCData, setUserKYCData] = useState({
    houseNo:"",
    pin:"",
    post_office:"",
    village:"",
  })
  useEffect(() => {
    if (isSuccess && data) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
        rationId: data.user.rationId,
        face_image:data.user.face_image_base64 ,
      });
      setUserKYCData({
        houseNo: data.kyc.houseNo,
        pin: data.kyc.pin,
        post_office: data.kyc.post_office,
        village: data.kyc.village,
      });
    }
  }, [isSuccess, data]);

  // let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUsertoken({ access_token: access_token }))
  }, [access_token, dispatch])

  
  return <>
  
    <CssBaseline />
    <Grid container>
      <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
      {/* <a href="/"><h3>
            <span className="dashboard_logo" >Secure</span>-Ration
          </h3></a> */}
        <h1>Dashboard</h1>
        <img src={`data:image/jpeg;base64,${userData.face_image}`} />
        {/* User Data */}
        <Typography variant='h5'>Email: {userData.email} </Typography>
        <Typography variant='h6'>Name: {userData.name}</Typography>
        <Typography variant='h5'>rationid:{userData.rationId} </Typography>
      
        {/* user KYC data */}
        <Typography variant='h5'>houseNo: {userKYCData.houseNo}</Typography>
        <Typography variant='h6'>pin: {userKYCData.pin}</Typography>
        <Typography variant='h5'>post_office: {userKYCData.post_office}</Typography>
        <Typography variant='h6'>village: {userKYCData.village}</Typography>
        {/* <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button> */}
      </Grid>
      <Grid item sm={8}>
        {/* <ChangePassword /> */}
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;