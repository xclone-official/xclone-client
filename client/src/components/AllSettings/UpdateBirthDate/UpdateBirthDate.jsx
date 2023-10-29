import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdateBirthDate() {
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
  const [dob, setdob] = useState("");
  async function handleUsercountry(e) {
    e.preventDefault();
    const new_dob = document.querySelector("#new_dob");
    try {
      if (dob.length <= 3) {
        if (new_dob) {
          new_dob.classList.add("border_red");
        }
      } else {
        if (new_dob) {
          new_dob.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/dob/${userData?._id}/${dob}`)
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
    setdob("");
  }
  return (
    <div>
      <TopComponent title="Update Birth Date" />
      <form onSubmit={handleUsercountry} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update Date of Birth?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Existing dob"
                id="existing_dob"
                disabled
                value={`${userData?.dob}`}
              />
              <label htmlFor="existing_dob">Current dob</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="date"
                placeholder="Enter dob"
                id="new_dob"
                onChange={(e) => {
                  setdob(e.target.value);
                }}
                value={dob}
              />
              <label htmlFor="new_dob">Enter dob</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Update date of birth!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change dob</button>
        </div>
      </form>
    </div>
  );
}
