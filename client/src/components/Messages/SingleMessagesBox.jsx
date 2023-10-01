import React from "react";
import "./singlemessages.css";
import { useNavigate } from "react-router-dom";
const dumbMessage = [
  {
    sender: "user1",
    receiver: "user2",
    content: "Hey there!",
    timestamp: "2023-09-30T14:30:00Z",
  },
  {
    sender: "user2",
    receiver: "user1",
    content: "Hi! How's it going?",
    timestamp: "2023-09-30T14:35:00Z",
  },
  {
    sender: "user1",
    receiver: "user3",
    content: "Hello, friend!",
    timestamp: "2023-09-30T15:00:00Z",
  },
  {
    sender: "user4",
    receiver: "user1",
    content: "What's up?",
    timestamp: "2023-09-30T15:15:00Z",
  },
  {
    sender: "user5",
    receiver: "user2",
    content: "Nice weather today!",
    timestamp: "2023-09-30T16:00:00Z",
  },
  {
    sender: "user2",
    receiver: "user5",
    content: "Yes, it's lovely!",
    timestamp: "2023-09-30T16:05:00Z",
  },
  {
    sender: "user6",
    receiver: "user4",
    content: "How's work?",
    timestamp: "2023-09-30T16:30:00Z",
  },
  {
    sender: "user4",
    receiver: "user6",
    content: "Busy as always!",
    timestamp: "2023-09-30T16:35:00Z",
  },
  {
    sender: "user3",
    receiver: "user1",
    content: "Do you want to grab some coffee?",
    timestamp: "2023-09-30T17:00:00Z",
  },
  {
    sender: "user1",
    receiver: "user3",
    content: "Sure, let's do it!",
    timestamp: "2023-09-30T17:05:00Z",
  },
];

export default function SingleMessagesBox() {
  const navigate = useNavigate();
  const goBackToPreviousPage = () => {
    navigate(-1);
  };
  function handleMessage(e) {
    e.preventDefault();
  }
  return (
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
          <p>Niraj Chaurasiya</p>
        </div>
      </div>
      <div className="messages_container_">
        <div className="messages_mid_container">
          {/* Messages */}
          <div className="user_credentials_messages">
            <div className="message_user_profile">
              <img src="/pfp.png" alt="" />
            </div>
            <div className="messsage_username_name">
              <p>Niraj Chaurasiya</p>
              <span>@niraj</span>
            </div>
            <div className="message_user_bio">
              <p>
                Full-stack developer • Tech writer • I help Businesses and
                Brands gain visibility online • Tweets around web development |
                AI | ML | Robotics | Tech experience
              </p>
            </div>
            <div className="joined_and_followers_num">
              <p>Joined August 2023</p>
              {"  •  "}
              <p>80 Followers</p>
            </div>
          </div>
          <div className="users_conversation">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 14, 13, 15, 16].map((e) => (
              <div key={e} className="user_conversation_container">
                <div className="my_msg_container">
                  <div className="my_messages">
                    <p>Hey there!</p>
                  </div>
                  <span>Aug 21, 2023, 7:04 AM</span>
                </div>
                <div className="user_msg_container">
                  <div className="other_user_messages">
                    <p>How are you?</p>
                  </div>
                  <span>Aug 21, 2023, 7:04 AM</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form onSubmit={handleMessage} id="message_input" action="">
        <input id="msg_input" placeholder="Enter Message" autocomplete="off" />
        <button className="message_input_btn">Send</button>
      </form>
    </div>
  );
}
