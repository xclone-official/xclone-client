import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import "./singlemessages.css";
import { MessageContext } from "../../useContext/MessageContext/MessageContext";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import axios from "axios";
export default function SingleMessagesBox({ socket }) {
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
    getAllTweetsFromFollowingUsers,
  ] = useContext(AuthContext);
  const [allMessages, setAllMessages] = useContext(MessageContext);
  const [message, setMessage] = useState("");
  const { userId } = useParams();
  const [isUserExists, setIsUserExists] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const chatContainerRef = useRef(null);
  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    } else {
    }
  };
  scrollToBottom();
  useLayoutEffect(() => {
    scrollToBottom();
  }, [allMessages, userId, chatContainerRef]);
  const fetchUser = async (userId) => {
    try {
      await axios
        .get(`${backendURL}/user/auth/getUser/${userId}`)
        .then((data) => {
          const response = data.data;
          if (response.status === 1) {
            setProfileData(data.data.data);
            setIsUserExists(true);
          } else {
            setIsUserExists(false);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error"); // Set loading to false in case of an error
    }
  };
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  useEffect(() => {
    setAllMessages([]);
    socket?.emit("saveAllMessages", {
      senderusername: userData?.username,
      senderId: userData?._id,
      receiverId: userId,
    });
  }, [userId]);
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };

  function handleMessage(e) {
    e.preventDefault();
    socket?.emit("addMsg", {
      senderId: userData?._id,
      senderUsername: userData?.username,
      receiverId: userId,
      message: message,
    });
    setMessage("");
  }
  return isUserExists ? (
    <div style={{ width: "100%" }}>
      <div className="profile_top">
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
          <p>{profileData?.fullname}</p>
        </div>
      </div>
      <div className="messages_container_">
        <div className="messages_mid_container">
          {/* Messages */}
          <div className="user_credentials_messages">
            <div className="message_user_profile">
              <img
                src={`${backendURL}/${profileData?.profilepicture}`}
                alt=""
              />
            </div>
            <div className="messsage_username_name">
              <p>{profileData?.fullname}</p>
              <span>@{profileData?.username}</span>
            </div>
            <div className="message_user_bio">
              <p>{profileData?.bio}</p>
            </div>
            <div className="joined_and_followers_num">
              <p>{convertDate(profileData?.createdAt)}</p>
              {"  •  "}
              <p>{profileData?.followers?.length} followers</p>
            </div>
          </div>
          <div className="users_conversation" ref={chatContainerRef}>
            {allMessages.length > 0
              ? allMessages?.map((e, i) => (
                  <div key={i} className="user_conversation_container">
                    {parseInt(e.senderId) === parseInt(userData._id) ? (
                      <div className="my_msg_container">
                        <div className="my_messages">
                          <p>{e?.message}</p>
                        </div>
                        <span>{convertDate(e?.createdAt)}</span>
                      </div>
                    ) : (
                      <div className="user_msg_container">
                        <div className="other_user_messages">
                          <p>{e?.message}</p>
                        </div>
                        <span>{convertDate(e?.createdAt)}</span>
                      </div>
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
      <form onSubmit={handleMessage} id="message_input" action="">
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          id="msg_input"
          placeholder="Enter Message"
          autoComplete="off"
        />
        <button className="message_input_btn">Send</button>
      </form>
    </div>
  ) : (
    <div>
      <p>User doesn't exist</p>
    </div>
  );
}