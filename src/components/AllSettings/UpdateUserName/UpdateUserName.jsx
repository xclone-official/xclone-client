import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdateUserName() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const [user_name, setUser_name] = useState("");
  async function handleUserName(e) {
    e.preventDefault();
    const new_username = document.querySelector("#new_username");
    try {
      if (user_name.length <= 5) {
        if (new_username) {
          new_username.classList.add("border_red");
        }
      } else {
        if (new_username) {
          new_username.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/username/${userData?._id}/${user_name}`)
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
    setUser_name("");
  }
  return (
    <div>
      <TopComponent title="Update Username" />
      <form onSubmit={handleUserName} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update Username?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter your password"
                id="existing_username"
                disabled
                value={`@ ${userData?.username}`}
              />
              <label htmlFor="existing_username">Current Username</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter new Username"
                id="new_username"
                onChange={(e) => {
                  setUser_name(e.target.value);
                }}
                value={user_name}
              />
              <label htmlFor="new_username">Enter new Username</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Username should be 6 characters long!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change username</button>
        </div>
      </form>
    </div>
  );
}
