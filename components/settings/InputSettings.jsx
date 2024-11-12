import React, { useState } from "react";

const InputSettings = ({ onSelectInputType, onClose }) => {
  const [inputType, setInputType] = useState("text");

  const handleInputTypeChange = (type) => {
    setInputType(type);
    onSelectInputType(type);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Input Type</h4>
      <select
        value={inputType}
        onChange={(e) => handleInputTypeChange(e.target.value)}
        style={{ width: "100%", padding: "5px" }}
      >
        <option value="text">متن</option>
        <option value="number">عدد</option>
      </select>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#333",
        }}
      >
        ×
      </button>
    </div>
  );
};

export default InputSettings;
