import React, { useContext, useState } from "react";
import "./Account_info.css";
import { Link, useNavigate } from "react-router-dom";
import "../../InputField/InputField.css";
import { AuthContext } from "../../Layout/Import";
import { convertDate } from "../../CovertDateTime/ConvertDateTime";
import { checkPass } from "../../../checkPasswordFunc/checkPass";

export default function Accountinfo() {
  const [step1, setStep1] = useState(true);
  const [inputField, setInputField] = useState("");
  const [step2, setStep2] = useState(false);
  const [, , , , userData, , , , , , , , , , , ,] = useContext(AuthContext);
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const forgot_password_field = document.querySelector(
      "#forgot_password_field"
    );

    if (forgot_password_field) {
      const isPasswordMatched = inputField
        ? await checkPass(userData?.email, inputField)
        : 0;
      if (isPasswordMatched === 1) {
        setStep1(!step1);
        setStep2(!step2);
      } else {
        forgot_password_field.classList.add("border_red");
      }
    }
  };
  const options = [
    {
      title: "Username",
      link: "/account/settings/account_info/username",
      desc: `@${userData?.username}`,
    },
    {
      title: "Name",
      link: "/account/settings/account_info/name",
      desc: `${userData?.fullname || ""}`,
    },
    {
      title: "Email",
      link: "/account/settings/account_info/email",
      desc: `${userData?.email}`,
    },
    {
      title: "Verified",
      desc: `Yes`,
    },
  ];
  const impo_options = [
    {
      title: "Protected posts",
      link: "/account/settings/account_info/protected_posts",
      desc: `${userData?.protected_posts}`,
    },
    {
      title: "Created At",
      desc: `${convertDate(userData?.createdAt)}`,
    },
  ];
  const other_options = [
    {
      title: "Country",
      link: "/account/settings/account_info/update_country",
      desc: `${userData?.location}`,
    },
    {
      title: "Languages",
      link: "/account/settings/account_info/update_language",
      desc: `${userData?.language}`,
    },
    {
      title: "Gender",
      link: "/account/settings/account_info/update_gender",
      desc: `${userData?.gender}`,
    },
    {
      title: "Birth date",
      desc: `${userData?.dob}`,
      link: "/account/settings/account_info/update_dob",
    },
  ];
  const another_options = [
    {
      title: "Age",
      desc: `${calculateAge(userData?.dob)} years old`,
    },
  ];
  return (
    <div className="account_info_container">
      <div className="account_info_mid_container profile_top">
        <svg
          onClick={goBackToPreviousPage}
          fill="var(--theme-color)"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
        <div
          className="top_tweetname"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p>Account Information</p>
        </div>
      </div>
      {step1 && (
        <form onSubmit={handleSubmit} className="verify_password_container">
          <div className="border_bottom">
            <div className="confirm_password">
              <p>Confirm your password</p>
            </div>
            <div className="confirm_password_alert">
              Please enter your password in order to get this.
            </div>
          </div>
          <br />
          <div className="verify_password_container_input">
            <div className="form-input">
              <input
                type="password"
                placeholder="Enter your password"
                id="forgot_password_field"
                onChange={(e) => {
                  setInputField(e.target.value);
                }}
                value={inputField}
              />
              <label htmlFor="forgot_password_field">Enter your password</label>
            </div>
          </div>
          <div className="verify_password_container_forgot_password">
            <p>Forgot password?</p>
          </div>
          <div className="forgot_password_submit_btn">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
      {step2 && (
        <div className="settings_midcontainer">
          <div className="important_container_info">
            {options.map((e, index) => (
              <div key={index}>
                {e?.link ? (
                  <Link to={e.link} key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="important_container_info">
            {impo_options.map((e, index) => (
              <div key={index}>
                {e?.link ? (
                  <Link to={e.link} key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="important_container_info">
            {other_options.map((e, index) => (
              <div key={index}>
                {e?.link ? (
                  <Link to={e.link} key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="">
            {another_options.map((e, index) => (
              <div key={index}>
                {e?.link ? (
                  <Link to={e.link} key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div key={index}>
                    <div className="setting_card" style={{ padding: "18px" }}>
                      <div style={{ display: "flex", gap: "25px" }}>
                        <div>
                          <p className="setting_title_name">{e.title}</p>
                          <span className="your_acc_descrriptionn">
                            {e.desc}
                          </span>
                        </div>
                      </div>
                      {e?.link ? (
                        <p className="setting_title_svg">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g>
                              <path
                                fill="white"
                                d="M14.586 12L7.543 4.96l1.414-1.42L17.414 12l-8.457 8.46-1.414-1.42L14.586 12z"
                              ></path>
                            </g>
                          </svg>
                        </p>
                      ) : (
                        <p className="setting_title_svg"></p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
