import axios from "axios";

async function authUserAPI(endPoint, data) {
  console.log(`API URL: ${process.env.REACT_APP_API_URL}`);

  const res = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_API_URL}/users/${endPoint}`,
    data,
  });
  console.log(res);

  const user = res.data.data.user;

  return { user, token: res.data.token };
}

export default authUserAPI;
