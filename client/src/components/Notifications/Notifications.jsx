import React from "react";
import "./Notifications.css";
export default function Notifications() {
  React.useEffect(() => {
    document.title = "X / Notifications";
  }, []);
  return (
    <div>
      <div>Notifications</div>
    </div>
  );
}
