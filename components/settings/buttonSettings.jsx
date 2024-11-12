import React, { useState } from "react";

const ButtonSettings = ({ onSelectButtonType, onClose }) => {
  const [buttonType, setButtonType] = useState("default");

  const handleButtonTypeChange = (type) => {
    setButtonType(type);
    onSelectButtonType(type);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Button Type</h4>
      <select
        value={buttonType}
        onChange={(e) => handleButtonTypeChange(e.target.value)}
        style={{ width: "100%", padding: "5px" }}
      >
        <option value="default">پیش فرض (خاکستری)</option>
        <option value="info">اطلاعات (آبی)</option>
        <option value="success">موفق (سبز)</option>
        <option value="warning">هشدار (نارنجی)</option>
        <option value="danger">خطر (قرمز)</option>
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

export default ButtonSettings;
