import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function SearchInput() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/hashtag/${searchQuery}`);
        // setSearchQuery("");
      }}
      className="right_searchbar"
    >
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search X"
      />
    </form>
  );
}
