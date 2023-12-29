import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function Updatephone() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const [Phone_num, setPhone_num] = useState("");
  async function handleUserName(e) {
    e.preventDefault();
    const new_phone = document.querySelector("#new_phone");
    try {
      if (!Phone_num) {
        if (new_phone) {
          new_phone.classList.add("border_red");
        }
      } else {
        if (new_phone) {
          new_phone.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/phone/${userData?._id}/${Phone_num}`)
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
    setPhone_num("");
  }
  return (
    <div>
      <TopComponent title="Update Phone" />
      <form onSubmit={handleUserName} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update phone?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter your password"
                id="existing_phone"
                disabled
                value={`${userData?.phone || "No number"}`}
              />
              <label htmlFor="existing_phone">Current phone</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter new Username"
                id="new_phone"
                onChange={(e) => {
                  setPhone_num(e.target.value);
                }}
                value={Phone_num}
              />
              <label htmlFor="new_phone">Enter new Phone</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Phone should be with country code!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change phone</button>
        </div>
      </form>
    </div>
  );
}
