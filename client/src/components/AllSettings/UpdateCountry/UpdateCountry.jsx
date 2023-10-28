import React, { useContext, useState } from "react";
import TopComponent from "../../TopComponent/TopComponent";
import { AuthContext } from "../../../useContext/AuthContext/AuthContext";
import axios from "axios";

export default function UpdateCountry() {
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
  const [country, setcountry] = useState("");
  async function handleUsercountry(e) {
    e.preventDefault();
    const new_country = document.querySelector("#new_country");
    try {
      if (country.length <= 3) {
        if (new_country) {
          new_country.classList.add("border_red");
        }
      } else {
        if (new_country) {
          new_country.classList.remove("border_red");
        }
        axios
          .put(`${backendURL}/update/country/${userData?._id}/${country}`)
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
      <TopComponent title="Update Country name" />
      <form onSubmit={handleUsercountry} className="verify_password_container">
        <div className="border_bottom">
          <div className="confirm_password">
            <p>Wanna update Country?</p>
          </div>
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter your password"
                id="existing_country"
                disabled
                value={`${userData?.location}`}
              />
              <label htmlFor="existing_country">Current country</label>
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="text"
                placeholder="Enter new Country"
                id="new_country"
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
                value={country}
              />
              <label htmlFor="new_country">Enter new Country</label>
            </div>
            <div
              style={{
                color: "var(--theme-color)",
                fontSize: "13px",
                padding: "4px 0",
              }}
            >
              <p>Country name should at least 3 characters long!</p>
            </div>
          </div>
          <br />
        </div>
        <div className="forgot_password_submit_btn">
          <button type="submit">Change Country</button>
        </div>
      </form>
    </div>
  );
}
