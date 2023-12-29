import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdateLanguage() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const [language, setcountry] = useState("");
  async function handleUsercountry(e) {
    e.preventDefault();
    const new_language = document.querySelector("#new_language");
    try {
      if (language.length <= 3) {
        if (new_language) {
          new_language.classList.add("border_red");
        }
      } else {
        if (new_language) {
          new_language.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/language/${userData?._id}/${language}`)
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
      <TopComponent title="Update language Name" />
      <form onSubmit={handleUsercountry} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update Language?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Existing Language"
                id="existing_language"
                disabled
                value={`${userData?.language}`}
              />
              <label htmlFor="existing_language">Current language</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter new Language"
                id="new_language"
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
                value={language}
              />
              <label htmlFor="new_language">Enter new Language</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Language name should at least 3 characters long!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change Language</button>
        </div>
      </form>
    </div>
  );
}
