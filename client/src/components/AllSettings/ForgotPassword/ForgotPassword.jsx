import React, { useContext, useState } from "react";
import "./forgotpassword.css";
import { useNavigate } from "react-router-dom";
import bcryptjs from "bcryptjs";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";
import MsgAlert from "../../MsgAlertComp/MsgAlert";
export default function ForgotPassword() {
  // eslint-disable-next-line
  const [inputField, setInputField] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [msgType, setMsgType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [, , , , userData, setUserData, , , , , , , , , , ,] =
    useContext(AuthContext);
  const statusHandlers = {
    1: () => {
      setMsgType("PASSWORD_UPDATE_SUCCESS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    2: () => {
      setMsgType("PASSWORD_UPDATE_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    3: () => {
      setMsgType("USERID_IS_EMPTY");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    4: () => {
      setMsgType("SERVER_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    5: () => {
      setMsgType("SERVER_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
  };
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  async function changePassword() {
    try {
      axios
        .put(`${backendURL}/update/password/${userData?._id}/${new_password}`)
        .then((data) => {
          if (data?.data?.status === 1) {
            setUserData(data?.data?.data);
          }
          const handler = statusHandlers[data?.data?.status];
          if (handler) {
            handler();
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    } catch (error) {
      console.log("error", error);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const isPasswordMatched = await bcryptjs.compare(
      inputField,
      userData?.password
    );
    // const isPasswordMatched = true;
    const forgot_password_input = document.querySelector(
      "#forgot_password_input"
    );
    const enter_new_password = document.querySelector("#enter_new_password");
    const forgot_password_field = document.querySelector(
      "#forgot_password_field"
    );
    if (forgot_password_input) {
      if (isPasswordMatched) {
        forgot_password_input.classList.remove("border_red");
        if (new_password === confirm_password) {
          if (new_password.length <= 7) {
            forgot_password_field.classList.remove("border_red");
            enter_new_password.classList.add("border_red");
            console.log(new_password.length);
          } else {
            enter_new_password.classList.remove("border_red");
            changePassword();
          }
        } else {
          enter_new_password.classList.add("border_red");
          forgot_password_field.classList.add("border_red");
        }
      } else {
        forgot_password_input.classList.add("border_red");
      }
    }
  }
  return (
    <div>
      <div className="profile_top">
        <svg
          onClick={goBackToPreviousPage}
          fill="var(--theme-color)"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
        <div
          className="top_tweetname"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>Change your password</p>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="verify_password_container">
          <div className="border_bottom">
            <div className="confirm_password">
              <p>Confirm your password</p>
            </div>
            <div className="verify_password_container_input">
              <div className="form-input">
                <input
                  type="password"
                  placeholder="Enter your password"
                  id="forgot_password_input"
                  onChange={(e) => {
                    setInputField(e.target.value);
                  }}
                />
                <label htmlFor="forgot_password_input">
                  Enter your password
                </label>
              </div>
            </div>

            <div className="verify_password_container_forgot_password">
              <p>Forgot password?</p>
            </div>
            <br />
          </div>
          <br />
          <div className="verify_password_container_input">
            <br />
            <div className="form-input">
              <input
                type="password"
                placeholder="Enter new password"
                id="enter_new_password"
                onChange={(e) => {
                  setNew_password(e.target.value);
                }}
                value={new_password}
              />
              <label htmlFor="enter_new_password">Enter new password</label>
            </div>
            <span className="short_password_alert">
              Your password needs to be at least 8 characters.
            </span>
            <br />
            <br />
            <div className="form-input">
              <input
                type="password"
                placeholder="Confirm your password"
                id="forgot_password_field"
                onChange={(e) => {
                  setConfirm_password(e.target.value);
                }}
                value={confirm_password}
              />
              <label htmlFor="forgot_password_field">
                Confirm your password
              </label>
            </div>
          </div>

          <div className="forgot_password_submit_btn">
            <button type="submit">Change password</button>
          </div>
        </form>
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </div>
  );
}
