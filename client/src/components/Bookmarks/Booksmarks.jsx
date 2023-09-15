import React from "react";
import "./bookmarks.css";
export default function Booksmarks() {
  React.useEffect(() => {
    document.title = "X / Bookmarks";
  }, []);
  return (
    <div>
      <div>Bookmarks</div>
    </div>
  );
}
