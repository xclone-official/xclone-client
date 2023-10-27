import React, { useState } from "react";
import "./InputField.css"; // You should create this CSS file with the styles

const InputField = ({ label, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="form-input">
      <input type="password" placeholder="Enter your password" id="password" />
      <label for="password">Enter your password</label>
    </div>
  );
};

export default InputField;
