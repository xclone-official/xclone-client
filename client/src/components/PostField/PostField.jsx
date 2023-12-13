import React, { useContext, useState } from "react";
import "./PostField.css";
import MsgAlert from "../MsgAlertComp/MsgAlert";
import axios from "axios";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import { SpecificTweets } from "../../useContext/SpecificTweet/SpecificTweet";
import { Editor } from "@tinymce/tinymce-react";
export default function PostField({
  tweetId,
  comment,
  replies,
  socket,
  receiverUsername,
  tweetdata,
}) {
  const [, , , , userData, , , , , setAllTweets, , , , setFollowingTweet] =
    useContext(AuthContext);
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
  const MSE_APIKEY = process.env.REACT_APP_MCE_KEY;
  const [, setSpecifictweetPage] = useContext(SpecificTweets);
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
        }
      } else {
        // If it's not a video, allow two image files
        if (selectedFiles.length <= 2) {
          setFiles(selectedFiles);
          setIsVideo(false);
        } else {
          // Display an error message or take other actions as needed
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
        .catch((err) => {});
    } catch (error) {}
    setIsVideo(false);
    setTextContent("");
    setFiles([]);
  };

  const saveComment = () => {
    try {
      const commentData = {
        commentText: textContent,
        commentUserId: userData?._id,
      };
      axios
        .post(
          `${backendURL}/tweetinteractions/commentoptions/comment/${tweetId}`,
          commentData
        )
        .then((data) => {
          if (data.data.status === 1) {
            const tweets = data.data.allTweets;
            setSpecifictweetPage(data.data.isTweetExist);
            setAllTweets(
              tweets.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );

            setFollowingTweet(
              data.data.allTweets.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
            );

            tweetId !== userData?.Id &&
              socket?.emit("sendRepliesNotification", {
                senderUsername: userData?.username,
                receiverUsername: receiverUsername,
                type: "replytweet",
                tweet: tweetdata,
                tweetId: tweetId,
                commentText: textContent,
              });
          } else {
            alert("Error");
          }
        })
        .catch((err) => {});
    } catch (error) {}
    setTextContent("");
  };
  const saveReply = () => {};
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
            <Editor
              apiKey={MSE_APIKEY}
              value={textContent}
              onEditorChange={(content) => setTextContent(content)}
              name="post"
              id="post-tweet"
              init={{
                placeholder: !comment
                  ? "What is happening?!"
                  : "Write a comment",
                color_cols: "red",
                body_class: "text_red",
                content_style:
                  "body {color: white; line-height: .3; } .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before { color: white ;opacity: 1 }",
                // Other TinyMCE configuration options go here
              }}
            />

            {/* <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder={!comment ? "What is happening?!" : "Write a comment"}
              name="post"
              id="post-tweet"
              rows="3"
            ></textarea> */}
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
                  alt=""
                />
                <p onClick={() => removeFile(index)} className="delete_photo">
                  X
                </p>
              </>
            ))
          ) : (
            files?.map((file, index) => (
              <>
                <img key={index} src={URL.createObjectURL(file)} alt="" />
                <p onClick={() => removeFile(index)} className="delete_photo">
                  X
                </p>
              </>
            ))
          )}
        </div>
        <p className="line"></p>
        <div className="icons_btn">
          {!comment && !replies && (
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
            <button
              disabled={!textContent}
              onClick={comment ? saveComment : replies ? saveReply : savePost}
            >
              {comment ? "✍" : replies ? "Reply" : "Post"}
            </button>
          </div>
        </div>
        <br />
      </div>
      {showMsg && <MsgAlert msgType={msgType} />}
    </>
  );
}
