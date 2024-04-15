import axios from "axios";

// const Base_URL = process.env.REACT_APP_BASE_URL;
// http://eurobridge-delivery-api.handsonsystems.com/api/auth/login
// const Base_URL = "http://eurobridge-delivery-api.handsonsystems.com/api";
const loginService = async (userData: any) => {
  try {
    let { data } = await axios.post(
      `http://eurobridge-delivery-api.handsonsystems.com/api/auth/userlogin`,
      {
        ...userData,
      }
    );
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data?.user ? data?.user : []));
    return data;
  } catch (err) {
    return err;
  }
};

const registerService = async (userData: any) => {
  try {
    let { data } = await axios.post(
      `http://eurobridge-delivery-api.handsonsystems.com/api/auth/register`,
      {
        ...userData,
      }
    );
    return data;
  } catch (err) {
    return err;
  }
};



export const authService = {
  loginService,
  registerService,
};
