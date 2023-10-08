import React, { useContext } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
// import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [showLogin, setShowLogin, showRegister, setShowRegister] =
    useContext(AuthContext);
  // const navigate = useNavigate();
  const toogleLoginMenu = () => {
    setShowLogin(!showLogin);
  };
  return (
    <>
      <div
        id="overlay"
        className={`${showLogin || showRegister ? "fix_height" : ""}`}
      >
        <div className="primary_page">
          <div className="auth-image">
            <img src="/xlogo-removebg-preview.png" alt="" />
          </div>
          <div className="auth-box">
            <div className="auth_text">
              <h1>Happening now</h1>
              <p>Join today.</p>
            </div>
            <div className="auth_btn">
              <div className="social_media_btn">
                <button>Sign up with Google</button>
                <button>Sign up with Apple </button>
              </div>
              <div className="auth_or">
                <p>or,</p>
              </div>
              <div className="create_acc">
                <button onClick={() => setShowRegister(!showRegister)}>
                  Create account
                </button>
              </div>
            </div>
            <div className="auth_msg">
              By signing up, you agree to the <span>Terms of Service</span> and
              <span>Privacy Policy</span>, including <span>Cookie Use</span>.
            </div>
            <div className="login_btn">
              <h3>Already have an account?</h3>
              <button onClick={toogleLoginMenu}>Sign in</button>
            </div>
          </div>
        </div>
        <div className="links">
          <p>About </p>
          <p>Help Center</p>
          <p>Terms of service</p>
          <p>Privacy Policy</p>
          <p>Cookie Policy</p>
          <p>Accessibility</p>
          <p>Ads info</p>
          <p>Blog</p>
          <p>Status</p>
          <p>Careers</p>
          <p>Brand Resources</p>
          <p>Advertising</p>
          <p>Marketing</p>
          <p>X for Business </p>
          <p>Developers</p>
          <p>Directory</p>
          <p>Settings</p>
          <p>&copy; 2023 Xclone Corp.</p>
        </div>
      </div>
      {showLogin && <Login />}
      {showRegister && <Register />}
    </>
  );
}
