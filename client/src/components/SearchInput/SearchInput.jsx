import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchInput({ message }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const handleClick = () => {
    !message ? navigate(`/explore`) : navigate("/messages");
  };
  return (
    <diiv onClick={handleClick} className="right_searchbar">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        disabled
        placeholder={!message ? "Search Xclone" : "Search Message"}
      />
    </diiv>
  );
}
