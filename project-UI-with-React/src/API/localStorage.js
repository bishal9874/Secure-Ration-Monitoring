import Cookies from 'js-cookie';

const storeToken = (value) => {
  if (value) {
    const { access, refresh, access_token_expiration } = value;
    Cookies.set('access_token', access);
    Cookies.set('refresh_token', refresh);
    Cookies.set('access_token_expiration', access_token_expiration);
  }
};

const getverify = (value) => {
  if (value) {
    const { isfaceverify } = value;
    Cookies.set('isfaceVerify', isfaceverify);
  }
};

const getToken = () => {
  const access_token = Cookies.get('access_token');
  const refresh_token = Cookies.get('refresh_token');
  const access_token_expiration = Cookies.get('access_token_expiration');
  return { access_token, refresh_token, access_token_expiration };
};

const removeToken = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('access_token_expiration');
};

const getIsverifyFace = () => {
  const isfaceVerify = Cookies.get('isfaceVerify');
  return isfaceVerify;
};

export { storeToken, getToken, removeToken, getIsverifyFace, getverify };
