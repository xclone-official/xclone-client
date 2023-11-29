import React, { useContext, useState } from "react";
import "./forgotpass.css";
import TopComponent from "../TopComponent/TopComponent";
import axios from "axios";
import { BTNLoader } from "../Loader/InfoLoader";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { NavLink } from "react-router-dom";
export default function ForgotPass() {
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState(" ");
  const [c_password, setC_password] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const password_container_form = document.querySelector(
      "#password_container_form"
    );

    const changePass = await axios.put(
      `${backendURL}/update/password/${userData?._id}/${password}`
    );
    const success_msg = document.querySelector("#success_msg");
    const status = changePass.data.status;
    if (password_container_form && status === 1) {
      setUserData(changePass.data.data);
      password_container_form.classList.remove("show_step_2_forgot_pass");
      password_container_form.classList.add("hide_step_2_forgot_pass");
      success_msg.classList.add("show_step_2_forgot_pass");
    } else {
      alert(changePass?.data?.msg);
    }
  }
  async function sendOTP(e) {
    setLoading(true);
    e.preventDefault();
    const sendOTPFORM = document.querySelector("#sendOTPFORM");
    const password_container_form = document.querySelector(
      "#password_container_form"
    );
    const checkOTP = document.querySelector("#checkOTP");

    const sendMail = await axios.post(
      `${backendURL}/send-email/sendOTP/${userData?.email}`
    );
    const status = sendMail.data.status;
    setLoading(false);
    if (sendOTPFORM && password_container_form && status === 1) {
      sendOTPFORM.classList.add("hide_step_2_forgot_pass");
      checkOTP.classList.add("show_step_2_forgot_pass");
      // password_container_form.classList.add("show_step_2_forgot_pass");
    }
  }
  const checkOTP = async (e) => {
    setLoading(true);
    e.preventDefault();
    const password_container_form = document.querySelector(
      "#password_container_form"
    );
    const checkOTP = document.querySelector("#checkOTP");

    const checkOTPStatus = await axios.get(
      `${backendURL}/check/otp/${otp}/${userData?.email}`
    );
    const status = checkOTPStatus.data.status;
    status !== 1 && alert(checkOTPStatus.data.msg);
    setLoading(false);
    if (checkOTP && password_container_form && status === 1) {
      checkOTP.classList.remove("show_step_2_forgot_pass");
      checkOTP.classList.add("hide_step_2_forgot_pass");
      password_container_form.classList.add("show_step_2_forgot_pass");
    }
  };
  return (
    <div className="forgot_password_container">
      <div className="forgot_password_midcontainer">
        <div className="top_element_forgot_password_generator">
          <TopComponent title="Forgot Password?" />
        </div>
        <div className="forgot_password_content">
          <div className="forgot_password_input_field">
            <form onSubmit={sendOTP} id="sendOTPFORM">
              <div className="forgot_password_content_title">
                <p>Dunno Worry!</p>
              </div>
              <div className="confirm_password">
                <p>Just confirm your email😃</p>
              </div>
              <div className="verify_password_container_input">
                <div className="form-input">
                  <input
                    type="email"
                    placeholder="Write your email!"
                    id="write_your_email"
                    required={true}
                    value={userData?.email}
                  />
                  <label htmlFor="write_your_email">Write your email!</label>
                </div>
              </div>
              <br />
              <div className="border_bottom"></div>

              <div className="forgot_password_submit_btn">
                <button type="submit">
                  {!loading ? "Send OTP" : <BTNLoader />}
                </button>
              </div>
              <div className="border_bottom"></div>
            </form>
            <form
              onSubmit={checkOTP}
              id="checkOTP"
              className="hide_step_2_forgot_pass"
            >
              <div className="confirm_password">
                <p>Now, type the code sent to your email!</p>
              </div>
              <div className="verify_password_container_input">
                <div className="form-input">
                  <input
                    type="number"
                    placeholder="Write your code!"
                    id="write_your_code"
                    required={true}
                    minLength="6"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                  <label htmlFor="write_your_code">Type the code!</label>
                </div>
              </div>
              <br />
              <div className="border_bottom"></div>

              <div className="forgot_password_submit_btn">
                <button type="submit">
                  {loading ? <BTNLoader /> : "Check OTP"}
                </button>
              </div>
              <div className="border_bottom"></div>
            </form>
            <form
              onSubmit={handleSubmit}
              id="password_container_form"
              className="verify_password_container hide_step_2_forgot_pass"
            >
              <div className="verify_password_container_input">
                <span className="short_password_alert">
                  Now, enter a new strong password.
                </span>
                <br />
                <br />
                <div className="form-input">
                  <input
                    type="password"
                    placeholder="Now, enter a new strong password."
                    id="enter_a_password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <label htmlFor="enter_a_password">
                    Now, enter a new strong password.
                  </label>
                </div>

                <br />
                <span className="short_password_alert">
                  Now, confirm your password.
                </span>
                <br />
                <br />
                <div className="form-input">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    id="confirm_password"
                    value={c_password}
                    onChange={(e) => setC_password(e.target.value)}
                  />
                  <label htmlFor="confirm_password">
                    Confirm your password
                  </label>
                </div>
              </div>
              <br />
              <span
                className="short_password_alert"
                style={{ marginLeft: "15px" }}
              >
                That's it click below🔥
              </span>
              <br />
              <br />
              <div className="border_bottom"></div>
              <div className="forgot_password_submit_btn">
                <button type="submit">
                  {loading ? <BTNLoader /> : "Change password"}
                </button>
              </div>
              <div className="border_bottom"></div>
            </form>
            <div
              className="hide_step_2_forgot_pass"
              id="success_msg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <div>
                <h2>That's it😉</h2>
                <p>Your password have been changed🎉</p>
                <div
                  className="forgot_password_submit_btn"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <NavLink to="/home">
                    <button type="submit">Navigate to Home</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
