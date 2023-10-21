import React from "react";
import "./404.css";
export default function PageNotFound() {
  return (
    <div
      style={{
        height: "30vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="not-found-container">
        {/* <img src="/xlogo-removebg-preview.png" alt="Xclone Logo" /> */}
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}
