import React from "react";

export default function PremiumBox({ feedback, social }) {
  return (
    <>
      {" "}
      {!feedback && !social && (
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
      )}
      {feedback && (
        <div className="verify_msg">
          <h1>We are working hard to make this app better.</h1>
          <h4>
            If you have any suggestion or any complain about any issue, please
            give us feedback.
          </h4>
          <button
            onClick={() => {
              window.open("mailto:xclone.new@gmail.com");
            }}
          >
            Give Feedback!
          </button>
        </div>
      )}
      {social && (
        <div className="verify_msg">
          <h1>Please give us a star on Github.</h1>
          <button
            onClick={() => {
              window.open("https://github.com/xclone-official");
            }}
          >
            Github
          </button>
        </div>
      )}
    </>
  );
}
