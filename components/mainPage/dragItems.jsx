"use client";

import React from "react";

const DragItem = ({ type }) => {
  if (type === "input") {
    return (
      <input
        type="text"
        placeholder="Enter text"
        style={{ padding: "5px", margin: "10px" }}
      />
    );
  } else if (type === "button") {
    return (
      <button style={{ padding: "5px 10px", margin: "10px" }}>Button</button>
    );
  }
  return null;
};

export default DragItem;
