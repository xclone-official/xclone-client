import React from "react";
import "./list.css";
export default function Lists() {
  React.useEffect(() => {
    document.title = "X / Lists";
  }, []);
  return (
    <div>
      <div>Lists</div>
    </div>
  );
}
