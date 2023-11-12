import React, { useContext, useEffect } from "react";
import "./editprofile.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
export default function Editprofile() {
  const [, , , , userData, , , , , , , , , , ,] = useContext(AuthContext);
  const navigate = useNavigate();
  const { username } = useParams();
  useEffect(() => {
    document.title = `${userData.fullname} / Edit Profile - Xclone`;
  }, [userData.fullname]);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (username) {
      if (username !== userData.username) {
        navigate("/home");
      }
    }
  }, [userData.username, username, navigate]);
  return (
    <div className="edit_profile_container">
      <div className="edit_profile_mid_container">
        <div
          onClick={() => {
            navigate(`/p/${userData.username}`);
          }}
          className="width_30_per"
        ></div>
        <div className="profile_edit_container">
          <div className="profile_top_edit_profile">
            <div
              className="profile_top"
              style={{ display: "flex", alignItems: "center" }}
            >
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
              <div className="top_tweetname">
                <p>Edit Profile</p>
              </div>
            </div>
          </div>
          <div className="profile_edit_fields">
            <div className="cover_edit">
              <img src="/cover.png" alt="" />
              <label htmlFor="new_cover_edit">
                <div className="choose_svg">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                    </g>
                  </svg>
                </div>
              </label>
              <input
                hidden
                type="file"
                name="new_cover_edit"
                id="new_cover_edit"
                accept="image/*"
              />
              <div className="choose_svg_cross">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="profile_edit">
              <img src="/pfp.png" alt="" />
              <div className="choose_svg">
                <label style={{ cursor: "pointer" }} htmlFor="new_profile_edit">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                    </g>
                  </svg>
                </label>
                <input
                  hidden
                  type="file"
                  name="new_profile_edit"
                  id="new_profile_edit"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="save_btn">
              <button>Save</button>
            </div>
          </div>
          {/* Users can edit: 1) Cover picture 2) Profile picture 3) Given Name 4)
          Bio 5) Date of birth 6) Country 7) Website */}
        </div>
        <div
          className="width_30_per"
          onClick={() => {
            navigate(`/p/${userData.username}`);
          }}
        ></div>
      </div>
    </div>
  );
}
