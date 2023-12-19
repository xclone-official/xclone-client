import React, { useContext, useEffect, useState } from "react";
import "./editprofile.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import TopComponent from "../TopComponent/TopComponent";
import axios from "axios";
import MsgAlert from "../MsgAlertComp/MsgAlert";
export default function Editprofile() {
  const [, , , , userData, setUserData, , , , , , , , , ,] =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { username } = useParams();
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  // const [profilePic, setProfilePic] = useState(userData?.profilepicture);
  const [coverPic, setCoverPic] = useState(userData?.coverpic || "/cover.png");
  const [websiteURL, setWebsiteURL] = useState(userData?.website);
  const [desc, setDesc] = useState(userData?.bio);
  const [msgType, setMsgType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    document.title = `${userData.fullname} / Edit Profile - Xclone`;
  }, [userData.fullname]);
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  const statusHandlers = {
    1: () => {
      setMsgType("UPDATION_SUCCEED");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    2: () => {
      setMsgType("USER_NOT_FOUND");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    3: () => {
      setMsgType("SERVER_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
  };
  useEffect(() => {
    if (username) {
      if (username !== userData.username) {
        navigate("/home");
      }
    }
  }, [userData.username, username, navigate]);
  // const handleProfileUpdate = (e) => {
  //   e.preventDefault();
  //   try {
  //     const fd = new FormData();
  //     fd.append("profilepicture", profilePic);
  //     axios
  //       .put(`${backendURL}/update/profilepicture/${userData?._id}`, fd)
  //       .then((data) => {
  //         const res = data.data;
  //         if (res.status === 1) {
  //           setUserData(res.user);
  //         }
  //         const handler = statusHandlers[res.status];
  //         handler();
  //       })
  //       .catch((err) => {
  //         const handler = statusHandlers[3];
  //         handler();
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const handleCoverUpdate = (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("cover", coverPic);
      console.log(coverPic);
      axios
        .put(`${backendURL}/update/coverpic/${userData?._id}`, fd)
        .then((data) => {
          const res = data.data;
          if (res.status === 1) {
            setUserData(res.user);
          }
          const handler = statusHandlers[res.status];
          handler();
        })
        .catch((err) => {
          const handler = statusHandlers[3];
          handler();
        });
    } catch (error) {
      const handler = statusHandlers[3];
      handler();
    }
  };
  const handleURLbioUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${backendURL}/update/urlanddesc/${userData?._id}`, {
          url: websiteURL,
          desc: desc,
        })
        .then((data) => {
          const res = data.data;
          if (res.status === 1) {
            setUserData(res.user);
          }
          const handler = statusHandlers[res.status];
          handler();
        })
        .catch((err) => {
          const handler = statusHandlers[3];
          handler();
        });
    } catch (error) {
      const handler = statusHandlers[3];
      handler();
    }
  };
  return (
    <div className="edit_profile_container">
      <div className="edit_profile_mid_container">
        <div
          onClick={() => {
            goBackToPreviousPage();
          }}
          className="width_30_per"
        ></div>
        <div className="profile_edit_container">
          <div className="profile_top_edit_profile">
            <TopComponent title="Edit Profile" />
          </div>
          <br />
          <div style={{ width: "90%", margin: "auto" }}>
            {/* <form
              className="form-input"
              encType="multipart/form-data"
              onSubmit={handleProfileUpdate}
            >
              <input
                type="file"
                accept="image/*"
                placeholder="profile picture"
                id="profile_picture_input"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
              <label htmlFor="profile_picture_input">Update Profile</label>
              <img
                className="profile_picture_img"
                src={
                  profilePic === userData?.profilepicture
                    ? backendURL + "/" + profilePic
                    : URL.createObjectURL(profilePic)
                }
                alt="user_image"
              />

              <br />
              <br />
              <div className="save_btn">
                <button type="submit">Update Profile</button>
              </div>
            </form>
            <br /> */}
            <form
              className="form-input"
              onSubmit={handleCoverUpdate}
              encType="multipart/form-data"
            >
              {userData?.coverpic ? (
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Cover picture"
                  id="cover_picture_input"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                />
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  placeholder="Confirm your password"
                  id="cover_picture_input"
                  onChange={(e) => setCoverPic(e.target.files[0])}
                />
              )}
              <label htmlFor="cover_picture_input">Update Cover</label>

              <img
                className="cover_picture_img"
                src={
                  coverPic === userData?.coverpic
                    ? backendURL + "/" + coverPic
                    : coverPic === "/cover.png"
                    ? coverPic
                    : URL.createObjectURL(coverPic)
                }
                alt="user_image"
              />
              <br />
              <br />
              <div className="save_btn">
                <button type="submit">Update Cover</button>
              </div>
            </form>
            <br />
            <form onSubmit={handleURLbioUpdate}>
              <div className="form-input">
                <input
                  type="url"
                  placeholder="Update URL"
                  id="update_URL"
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                />
                <label htmlFor="update_URL">Update URL</label>
              </div>
              <br />
              <div className="form-input">
                <input
                  type="text"
                  placeholder="Update Description"
                  id="update_desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label htmlFor="update_desc">Update Bio</label>
              </div>

              <br />
              <div className="save_btn">
                <button type="submit">Update URL & Bio</button>
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
        <div
          className="width_30_per"
          onClick={() => {
            goBackToPreviousPage();
          }}
        ></div>
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </div>
  );
}
