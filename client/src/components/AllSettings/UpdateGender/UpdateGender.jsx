import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function Updategender() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const [gender, setcountry] = useState("");
  async function handleUsercountry(e) {
    e.preventDefault();
    const new_gender = document.querySelector("#new_gender");
    try {
      if (gender.length <= 3) {
        if (new_gender) {
          new_gender.classList.add("border_red");
        }
      } else {
        if (new_gender) {
          new_gender.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/gender/${userData?._id}/${gender}`)
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
    setcountry("");
  }
  return (
    <div>
      <TopComponent title="Update Gender" />
      <form onSubmit={handleUsercountry} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update Gender?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Existing gender"
                id="existing_gender"
                disabled
                value={`${userData?.gender}`}
              />
              <label htmlFor="existing_gender">Current gender</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter gender"
                id="new_gender"
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
                value={gender}
              />
              <label htmlFor="new_gender">Enter gender</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>
                Gender name should be correct name as Male, Female, or Prefer
                not to say!
              </p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change Gender</button>
        </div>
      </form>
    </div>
  );
}
