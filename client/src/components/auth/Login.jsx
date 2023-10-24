import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import Loader from "../Loader/Loader";
import MsgAlert from "../MsgAlertComp/MsgAlert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Login() {
  const [
    showLogin,
    setShowLogin,
    showRegister,
    setShowRegister,
    userData,
    setUserData,
    loading,
    setLoading,
    allTweets,
    setAllTweets,
    infoLoader,
    setInfoLoader,
    followingTweet,
    setFollowingTweet,
    getAllTweets,
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const navigate = useNavigate();
  const [step1, setStep1] = useState(true);

  const [loader, setLoader] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const [emailUsername, setEmailUsername] = useState("");
  const [password, setPassword] = useState("");

  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const statusHandlers = {
    1: () => {
      setMsgType("LOGIN_SUCCESS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    2: () => {
      setMsgType("ACTIVATED_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    3: () => {
      setMsgType("INVALID_CREDENTIALS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
    4: () => {
      setMsgType("SERVER_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
        setLoader(false);
      }, 2000);
    },
  };

  const LOGINUSER = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`${backendURL}/user/auth/login`, {
        username: emailUsername,
        password: password,
      });
      const status = response.data.status;
      const handler = statusHandlers[status];
      setUserData(response.data.data);
      if (response.data.status === 1) {
        const uId = response.data.data._id;
        Cookies.set("xid", uId, { expires: 30 });
      }
      navigate("/home?type=for-you");
      if (handler) {
        handler();
      }
    } catch (error) {
      console.log("Error:", error);
      const handler = statusHandlers[4];
      setLoader(true);
      if (handler) {
        handler();
        setLoader(false);
      }
    }
  };
  return (
    <>
      <div className="login_page">
        <div className="login_head">
          <ImCross id="cross" onClick={() => setShowLogin(!showLogin)} />
          <div className="x_logo">
            <img src="/x-logo.png" alt="logo" />
          </div>
        </div>
        {step1 || !emailUsername ? (
          <div className="login_content">
            <div className="auth_head">
              <h1>Sign in to X</h1>
            </div>
            <div className="auth_btn">
              {/* <div className="social_media_btn">
                <button>Sign in with Google</button>
                <button>Sign in with Apple </button>
              </div> */}
              {/* <div className="auth_or">
                <p>or,</p>
              </div> */}
              <div className="login_input">
                <input
                  value={emailUsername}
                  onChange={(e) => setEmailUsername(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                />
                <div className="social_media_btn">
                  <button
                    onClick={() => setStep1(!step1)}
                    disabled={!emailUsername}
                  >
                    Next
                  </button>
                  <button className="forgot_pass">Forgot password</button>
                </div>
              </div>
              <div className="signUp">
                <p>
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      setShowLogin(!showLogin);
                      setShowRegister(!showRegister);
                    }}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="login_content">
            <div className="auth_head">
              <h1>Enter your password</h1>
            </div>
            <div className="auth_btn">
              <div className="login_input">
                <input
                  type="text"
                  placeholder="Enter username or email"
                  value={emailUsername}
                  disabled
                />
                <br />
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="social_media_btn">
                  <button
                    onClick={LOGINUSER}
                    disabled={!password}
                    className="forgot_pass"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {loader && <Loader />}
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </>
  );
}
