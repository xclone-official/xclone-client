// import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
// import { AuthContext } from "../../useContext/AuthContext/AuthContext";
import { customTimeFormat } from "../customTime/customTime";
export default function MessageComponent({ e }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  return (
    <div
      className="single_message"
      onClick={() => navigate(`/messages/${e?._id}`)}
    >
      <div className="message_profile">
        <img src={`${backendURL}/${e?.profile}`} alt="" />
      </div>
      <div className="msg_user_credentials">
        <div className="user_info_msg">
          <p>
            {e?.name}{" "}
            <span>
              @{e?.username} . {customTimeFormat(e?.createdAt)}{" "}
            </span>
          </p>
        </div>
        <div className="actual_msg" style={{ color: "rgb(139, 152, 165)" }}>
          <p>Created this chat on {convertDate(e?.createdAt)?.slice(10, 25)}</p>
        </div>
      </div>
    </div>
  );
}
