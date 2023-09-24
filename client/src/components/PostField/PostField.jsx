import React, { useContext, useState } from "react";
import "./PostField.css";
import MsgAlert from "../MsgAlertComp/MsgAlert";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { Link } from "react-router-dom";
const icons = [
  {
    name: "",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path
            fill="var(--theme-color)"
            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
          ></path>
        </g>
      </svg>
    ),
  },
  // {
  //   name: "",
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <g>
  //         <path
  //           fill="var(--theme-color)"
  //           d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
  //         ></path>
  //       </g>
  //     </svg>
  //   ),
  // },
  // {
  //   name: "",
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <g>
  //         <path
  //           fill="var(--theme-color)"
  //           d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z"
  //         ></path>
  //       </g>
  //     </svg>
  //   ),
  // },
  // {
  //   name: "",
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <g>
  //         <path
  //           fill="var(--theme-color)"
  //           d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
  //         ></path>
  //       </g>
  //     </svg>
  //   ),
  // },
  // {
  //   name: "",
  //   icon: (
  //     <svg viewBox="0 0 24 24" aria-hidden="true">
  //       <g>
  //         <path
  //           fill="var(--theme-color)"
  //           d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z"
  //         ></path>
  //       </g>
  //     </svg>
  //   ),
  // },
];

export default function PostField({ comment }) {
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
  ] = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [isVideo, setIsVideo] = useState(false);
  const [msgType, setMsgType] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [textContent, setTextContent] = useState("");
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const statusHandlers = {
    1: () => {
      setMsgType("MORE_THAN_TWO_PHOTOS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    2: () => {
      setMsgType("UPLOAD_ERROR");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
    3: () => {
      setMsgType("UPLOAD_SUCCESS");
      setShowMsg(true);
      setTimeout(() => {
        setShowMsg(false);
      }, 2000);
    },
  };

  const [count, setCount] = useState(0);
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if at least one file is selected
    if (selectedFiles.length > 0) {
      const file = selectedFiles[0];

      // Check if the selected file is a video
      if (file.type.includes("video/")) {
        // If it's a video, allow only one video file
        if (selectedFiles.length === 1) {
          setFiles(selectedFiles);
          setIsVideo(true);
        } else {
          // Display an error message or take other actions as needed
          console.error("You can select only one video file.");
        }
      } else {
        // If it's not a video, allow two image files
        if (selectedFiles.length <= 2) {
          setFiles(selectedFiles);
          setIsVideo(false);
        } else {
          // Display an error message or take other actions as needed
          // console.error("You can select up to two image files.");
          const msgText = statusHandlers[1];
          msgText();
        }
      }
    }
    setCount(count + 1);
  };
  const removeFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  const savePost = async () => {
    try {
      // tweetaction;
      const fd = new FormData();
      fd.append("tweetContent", textContent);
      fd.append("authorName", userData.fullname);
      fd.append("authorId", userData._id);
      fd.append("authorUsername", userData.username);
      fd.append("authorProfile", userData.profilepicture);
      for (let i = 0; i < files.length; i++) {
        fd.append("tweetmedia", files[i]);
      }
      await axios
        .post(`${backendURL}/tweetaction/createtweet`, fd)
        .then((data) => {
          if (data.data.status === 1) {
            setAllTweets((prevTweets) => [data.data.data, ...prevTweets]);
            const msgText = statusHandlers[3];
            msgText();
          }
        })
        .catch((err) => {
          console.log("Err", err);
        });
    } catch (error) {
      console.log(error);
    }
    setIsVideo(false);
    setTextContent("");
    setFiles([]);
  };
  return (
    <>
      <div className="postfield_container">
        <div className="img_textarea">
          <div className="post_profile">
            <Link to={`/p/${userData?.username}`}>
              <img src={backendURL + "/" + userData?.profilepicture} alt="" />
            </Link>
          </div>
          <div className="textarea_">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder={!comment ? "What is happening?!" : "Write a comment"}
              name="post"
              id="post"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div
          className={
            (files && files.length > 1) || isVideo
              ? "choose_images"
              : "choosen_img_1"
          }
        >
          {isVideo ? (
            <>
              <video controls width="200">
                <source
                  src={URL.createObjectURL(files[0])}
                  type={files[0].type}
                />
                Your browser does not support the video tag.
              </video>
              <p
                onClick={() => {
                  setIsVideo(false);
                  setFiles([]);
                }}
                className="delete_photos"
              >
                X
              </p>
            </>
          ) : files.length > 0 && files.length === 1 ? (
            files?.map((file, index) => (
              <>
                <img
                  key={index}
                  className="choosen_img_1"
                  src={URL.createObjectURL(file)}
                  alt={`Selected Image ${index + 1}`}
                />
                <p onClick={() => removeFile(index)} className="delete_photo">
                  X
                </p>
              </>
            ))
          ) : (
            files?.map((file, index) => (
              <>
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Selected Image ${index + 1}`}
                />
                <p onClick={() => removeFile(index)} className="delete_photo">
                  X
                </p>
              </>
            ))
          )}
        </div>
        <p className="line"></p>
        <div className="icons_btn">
          {!comment && (
            <div className="post_icons">
              {/* Icons */}
              <div className="post_icon">
                <label
                  htmlFor="image"
                  style={{ cursor: "pointer", height: "20px" }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path
                        fill={`${
                          count > 0
                            ? "var(--theme-hover-color)"
                            : "var(--theme-color)"
                        }`}
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                      ></path>
                    </g>
                  </svg>
                </label>
                <input
                  onChange={handleFileChange}
                  disabled={count > 0}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  multiple
                  hidden
                />
              </div>

              <div className="post_icon">
                <label
                  htmlFor="video"
                  style={{ cursor: "pointer", height: "20px" }}
                >
                  <svg
                    stroke="currentColor"
                    fill="#fff"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1.3em"
                    width="1.3em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill={`${
                        count > 0
                          ? "var(--theme-hover-color)"
                          : "var(--theme-color)"
                      }`}
                      d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7zM328 352c0 4.4-3.6 8-8 8H208c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8v48zm560 273l-104-59.8V458.9L888 399v226z"
                    ></path>
                  </svg>
                </label>
                <input
                  onChange={handleFileChange}
                  disabled={count > 0}
                  type="file"
                  id="video"
                  name="video"
                  accept="video/*"
                  hidden
                />
              </div>
            </div>
          )}
          <div className="post_btn">
            <button disabled={!textContent} onClick={savePost}>
              {comment ? "✍" : "Post"}
            </button>
          </div>
        </div>
        <br />
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </>
  );
}
