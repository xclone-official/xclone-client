import React from "react";

export default function MessageComponent({ e }) {
  return (
    <div key={e} className="single_message">
      <div className="message_profile">
        <img src="/pfp.png" alt="" />
      </div>
      <div className="msg_user_credentials">
        <div className="user_info_msg">
          <p>
            Niraj Chaurasiya <span>@niraj . 4h </span>
          </p>
        </div>
        <div className="actual_msg">
          <p>Hey there!</p>
        </div>
      </div>
    </div>
  );
}
