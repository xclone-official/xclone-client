import React from "react";

export default function PremiumBox() {
  return (
    <div className="verify_msg">
      <h1>Subscribe to Premium </h1>
      <h4>
        No need to subscribe to premium. You <br />
        will get blue tick for free😂
      </h4>
      <button
        onClick={() => {
          alert("Hurray!");
        }}
      >
        Hurray!
      </button>
    </div>
  );
}
