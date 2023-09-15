import React from "react";
import "./Messages.css";
export default function Messages() {
  React.useEffect(() => {
    document.title = "X / Messages";
  }, []);
  return (
    <div>
      <div>Messages</div>
    </div>
  );
}
