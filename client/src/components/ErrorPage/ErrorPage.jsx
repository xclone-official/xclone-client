import React from "react";
import "./ErrorPage.css";
export default function ErrorPage() {
  document.title = "User Not Found";
  return (
    <div class="message-container">
      <h1 className="h1">User Not Found</h1>
      <p className="p">The user you are looking for does not exist.</p>
    </div>
  );
}
