import React, { useContext, useState } from "react";
import "./auth.css";
import Login from "./Login";
import Register from "./Register";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
export default function Auth() {
  const [showLogin, setShowLogin, showRegister, setShowRegister] =
    useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [is_verified, setIs_verified] = useState(false);
  const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const toogleLoginMenu = () => {
    setShowLogin(!showLogin);
  };
  const googleAuthSuccess = (data) => {
    try {
      const decodedData = jwt_decode(data.credential);
      const decoded_email = decodedData.email;
      const decoded_name = decodedData.name;
      const decoded_email_verified = decodedData.email_verified;
      setEmail(decoded_email);
      setName(decoded_name);
      setIs_verified(decoded_email_verified);
      setShowRegister(true);
    } catch (error) {
      console.log(error);
    }
  };
  const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const googleAuthError = () => {};
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}&scope=read:user,user:email`;
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
                <GoogleOAuthProvider clientId={REACT_APP_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      googleAuthSuccess(credentialResponse);
                    }}
                    onError={() => {
                      googleAuthError();
                    }}
                    width="282px"
                    text="Signup with Google"
                  />
                </GoogleOAuthProvider>
                <button
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                  onClick={handleGithubLogin}
                >
                  <svg
                    height="20"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="20"
                  >
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                  </svg>{" "}
                  Sign up with Github{" "}
                </button>
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
      {showRegister && (
        <Register name={name} email={email} is_verified={is_verified} />
      )}
    </>
  );
}
