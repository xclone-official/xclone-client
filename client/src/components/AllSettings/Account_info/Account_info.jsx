import React, { useContext, useState } from "react";
import "./Account_info.css";
import { useNavigate } from "react-router-dom";
import "../../InputField/InputField.css";
import bcryptjs from "bcryptjs";
import { AuthContext } from "../../Layout/Import";
export default function Account_info() {
  const [step1, setStep1] = useState(true);
  const [inputField, setInputField] = useState("");
  const [step2, setStep2] = useState(false);
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
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const forgot_password_field = document.querySelector(
      "#forgot_password_field"
    );

    if (forgot_password_field) {
      const isPasswordMatched = await bcryptjs.compare(
        inputField,
        userData?.password
      );
      if (isPasswordMatched) {
        setStep1(!step1);
        setStep2(!step2);
      } else {
        forgot_password_field.classList.add("border_red");
      }
    }
  };
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
          <p>Account Information</p>
        </div>
      </div>
      {step1 && (
        <form onSubmit={handleSubmit} className="verify_password_container">
          <div className="border_bottom">
            <div className="confirm_password">
              <p>Confirm your password</p>
            </div>
            <div className="confirm_password_alert">
              Please enter your password in order to get this.
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="password"
                placeholder="Enter your password"
                id="forgot_password_field"
                onChange={(e) => {
                  setInputField(e.target.value);
                }}
                value={inputField}
              />
              <label htmlFor="forgot_password_field">Enter your password</label>
            </div>
          </div>
          <div className="verify_password_container_forgot_password">
            <p>Forgot password?</p>
          </div>
          <div className="forgot_password_submit_btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      {step2 && <>Hello</>}
    </div>
  );
}
