import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdatEmail() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
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
  ] = useContext(AuthContext);
  const [email, setEmail] = useState("");
  async function handleUserName(e) {
    e.preventDefault();
    const new_email = document.querySelector("#new_email");
    try {
      if (!email) {
        if (new_email) {
          new_email.classList.add("border_red");
        }
      } else {
        if (new_email) {
          new_email.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/email/${userData?._id}/${email}`)
          .then((data) => {
            if (data.data?.status === 1) {
              setUserData(data.data.user);
            }
          })
          .catch((Err) => {
            console.log("Err", Err);
          });
      }
    } catch (error) {
      console.log("Internal server error");
    }
    setEmail("");
  }
  return (
    <div>
      <TopComponent title="Update Phone" />
      <form onSubmit={handleUserName} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update email?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter your email"
                id="existing_email"
                disabled
                value={`${userData?.email}`}
              />
              <label htmlFor="existing_email">Current email</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="email"
                placeholder="Enter new Email"
                id="new_email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <label htmlFor="new_email">Enter new Email</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Email should be valid!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change email</button>
        </div>
      </form>
    </div>
  );
}
