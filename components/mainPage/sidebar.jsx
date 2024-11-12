"use client";
import React from "react";
import ButtonSettings from "../settings/buttonSettings";
import InputSettings from "../settings/InputSettings";

const Sidebar = ({
  onDragStart,
  onSelectButtonType,
  onSelectInputType,
  configType,
  onClose,
}) => {
  return (
    <div
      style={{
        width: "250px",
        padding: "10px",
        borderRight: "1px solid #ddd",
        position: "relative",
        color:"black"
      }}
    >
      <h3>Sidebar</h3>

      {!configType ? (
        <>
          <div
            draggable
            onDragStart={(e) => onDragStart(e, "input")}
            style={{
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#f0f0f0",
              textAlign: "center",
              cursor: "pointer",
              color:"black"
            }}
          >
            Input
          </div>
          <div
            draggable
            onDragStart={(e) => onDragStart(e, "button")}
            style={{
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#f0f0f0",
              textAlign: "center",
              cursor: "pointer",
              color:"black"
            }}
          >
            Button
          </div>
        </>
      ) : configType === "button" ? (
        <ButtonSettings
          onSelectButtonType={onSelectButtonType}
          onClose={onClose}
        />
      ) : (
        <InputSettings
          onSelectInputType={onSelectInputType}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default Sidebar;
