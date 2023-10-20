import axios from "axios";
const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REACT_APP_GITHUB_CLIENT_SECRET =
  process.env.REACT_APP_GITHUB_CLIENT_SECRET;
async function getAccessToken() {
  const code = new URLSearchParams(window.location.search).get("code");
  const res = await axios.post(
    `${REACT_APP_BACKEND_URL}/login/oauth/access_token`,
    {
      client_id: REACT_APP_GITHUB_CLIENT_ID,
      client_secret: REACT_APP_GITHUB_CLIENT_SECRET,
      code: code,
    }
  );
  const access_token = res.data.res;
  return access_token;
}
async function getUserData() {
  const access_token = localStorage.getItem("Xtempdata");
  const res = await axios.get(
    `${REACT_APP_BACKEND_URL}/github/getUser/${access_token}`
  );
  const userdata = res.data.res;
  return userdata;
}

export { getAccessToken, getUserData };
