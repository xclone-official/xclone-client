import { useNavigate } from "react-router-dom";
import { convertDate } from "../CovertDateTime/ConvertDateTime";
import { customTimeFormat } from "../customTime/customTime";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MessageComponent({ userId }) {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchUserWithId(userId) {
      try {
        axios.get(`${backendURL}/user/auth/getUser/${userId}`).then((data) => {
          const res = data.data;
          if (res.status === 1) {
            setUser(res.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserWithId(userId);
  }, [userId]);

  return (
    <div
      className="single_message"
      onClick={() => navigate(`/messages/${user._id}`)}
    >
      <div className="message_profile">
        <img src={`${backendURL}/${user?.profilepicture}`} alt="" />
      </div>
      <div className="msg_user_credentials">
        <div className="user_info_msg">
          <p>
            {user?.name}{" "}
            <span>
              @{user?.username} . {customTimeFormat(user?.createdAt)}{" "}
            </span>
          </p>
        </div>
        <div className="actual_msg" style={{ color: "rgb(139, 152, 165)" }}>
          <p>
            Created this chat on {convertDate(user?.createdAt)?.slice(10, 25)}
          </p>
        </div>
      </div>
    </div>
  );
}
