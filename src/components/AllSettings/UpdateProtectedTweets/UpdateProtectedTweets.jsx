import React, { useContext } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdateProtectedTweets() {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);

  async function handleUserName(e) {
    e.preventDefault();
    try {
      axios
        .put(`${backendURL}/update/protected_tweets/${userData?._id}`)
        .then((data) => {
          if (data.data?.status === 1) {
            setUserData(data.data.user);
          }
        })
        .catch((Err) => {
          console.log("Err", Err);
        });
    } catch (error) {
      console.log("Internal server error", error);
    }
  }
  return (
    <div>
      <TopComponent title="Update Username" />
      <form onSubmit={handleUserName} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna change Protected tweets status?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Change status"
                id="existing_status"
                disabled
                value={`${userData?.protected_posts}`}
              />
              <label htmlFor="existing_status">Current Status</label>
            </div>
          </div>
          <br />
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change status</button>
        </div>
      </form>
    </div>
  );
}
