import React, { useContext } from "react";
import "./ShowDeactivationPromptToActivate.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import Cookies from "js-cookie";
export default function ShowDeactivationPromptToActivate() {
  const [, , , , , setUserData, , , , , , , , , , ,] = useContext(AuthContext);
  const navigate = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  async function handleDeactivateFunc() {
    try {
      const xid = localStorage.getItem("xid");
      if (xid) {
        axios
          .put(`${backendURL}/update/flag/${xid}`)
          .then((data) => {
            console.log(data.data);
            if (data?.data?.status === 1) {
              localStorage.removeItem("xid");
              const uId = data.data.user._id;
              Cookies.set("xid", uId, { expires: 30 });
              setUserData(data.data.user);
              navigate("/home");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div className="show_deactivation_to_activate_container">
      <div className="show_activation_mid_container">
        <div className="cross_sign_show_activation_container">
          <p
            onClick={() => {
              localStorage.removeItem("xid");
              window.location.reload();
            }}
          >
            X
          </p>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="activation_prompt_content">
          <div className="activation_prompt_content_img">
            <img src="/xlogo-removebg-preview.png" alt="" />
          </div>

          <div className="deactivation_content">
            <div className="activation_prompt_content_head_text">
              <h2>Reactivate your account?</h2>
            </div>
            <div className="activation_prompt_content_text">
              <p>
                Since, you have deactivated your account, in order to access
                your account again, you need to reactivate it.
              </p>
            </div>
            <br />
            <div className="activation_prompt_content_head_buttons">
              <button onClick={handleDeactivateFunc}> Yes, Reactivate</button>
              <button
                onClick={() => {
                  localStorage.removeItem("xid");
                  window.location.reload();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
