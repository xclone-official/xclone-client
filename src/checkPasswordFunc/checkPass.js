import axios from "axios";
const backendURL = process.env.REACT_APP_BACKEND_URL;
const checkPass = async (email, password) => {
  const checkPW = await axios.get(
    `${backendURL}/check/password/${email}/${password}`
  );
  return checkPW.data.status;
};
export { checkPass };
