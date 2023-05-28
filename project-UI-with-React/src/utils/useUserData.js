import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetLogged_userQuery } from "../API/rationApi";
import { setUsertoken, unSetUsertoken } from "../features/authSlice";
import { getToken, getverify, removeToken } from "../API/localStorage";

const useUserData = () => {
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLogged_userQuery(access_token);
  const dispatch = useDispatch();
  
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    rationId: "",
    face_image: "",
  });

  const [userKYCData, setUserKYCData] = useState({
    houseNo: "",
    pin: "",
    post_office: "",
    village: "",
    aadharcardNo: "",
    phoneNo: "",
    dateofbirth: "",
    gender: "",
    state: "",
    district: "",
    Annual_income: "",
    fpsCode: "",
  });

  const [userRationDetails, setUserRationDetails] = useState({
    id: "",
    cardType: "",
    rice: "",
    wheat: "",
    oil: "",
    kerosene: "",
    nextRationDate: "",
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserData({
        email: data.user.email,
        name: data.user.name,
        rationId: data.user.rationId,
        face_image: data.user.face_image_base64,
      });
      setUserKYCData({
        houseNo: data.kyc.houseNo,
        pin: data.kyc.pin,
        post_office: data.kyc.post_office,
        village: data.kyc.village,
        aadharcardNo: data.kyc.aadharcardNo,
        phoneNo: data.kyc.phoneNo,
        dateofbirth: data.kyc.dateofbirth,
        gender: data.kyc.gender,
        state: data.kyc.state,
        district: data.kyc.district,
        Annual_income: data.kyc.Annual_income,
        fpsCode: data.kyc.fpsCode,
      });
      setUserRationDetails({
        id: data.details.id,
        cardType: data.details.cardType,
        rice: data.details.rice,
        wheat: data.details.wheat,
        oil: data.details.oil,
        kerosene: data.details.kerosene,
        nextRationDate: data.details.nextRationDate,
      });
    }
  }, [isSuccess, data]);

  return { userData, userKYCData, userRationDetails };
};

export default useUserData;
