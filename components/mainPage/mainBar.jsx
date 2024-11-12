import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const MainContent = ({
  buttonTypes,
  inputTypes,
  setButtonTypes, // دریافت setButtonTypes به عنوان prop
  setInputTypes,  // دریافت setInputTypes به عنوان prop
  onButtonClick,
  onInputClick,
  setGeneratedCode,
  generatedCode,
}) => {
  const [showMainPlus, setShowMainPlus] = useState(true);
  const [showRectangles, setShowRectangles] = useState(false);
  const [plusCount, setPlusCount] = useState(0);
  const [items, setItems] = useState(Array(2).fill(null));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const storedItems = localStorage.getItem("savedItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("plusCount", plusCount);
  }, [items, plusCount]);

  const handleMainPlusClick = () => {
    setShowMainPlus(false);
    setShowRectangles(true);
  };

  const handleReset = () => {
    setShowMainPlus(true);
    setShowRectangles(false);
    setPlusCount(0);
    setItems(Array(2).fill(null));
    localStorage.removeItem("items");
    localStorage.removeItem("plusCount");
  };

  const handleRectangleClick = (count) => {
    setPlusCount(count);
    setShowRectangles(false);

    // اطمینان از اینکه آرایه‌های `buttonTypes` و `inputTypes` به اندازه کافی بزرگ باشند
    setButtonTypes((prev) => {
      const newButtonTypes = [...prev];
      while (newButtonTypes.length < count) {
        newButtonTypes.push("default"); // مقدار پیش‌فرض برای دکمه‌های جدید
      }
      return newButtonTypes;
    });

    setInputTypes((prev) => {
      const newInputTypes = [...prev];
      while (newInputTypes.length < count) {
        newInputTypes.push("text"); // مقدار پیش‌فرض برای ورودی‌های جدید
      }
      return newInputTypes;
    });
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("drag-item-type");
    const newItems = [...items];
    newItems[index] = type;
    setItems(newItems);
    setHoveredIndex(null);
    localStorage.setItem("savedItems", JSON.stringify(newItems));
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (index) => setHoveredIndex(index);
  const handleDragLeave = () => setHoveredIndex(null);

  const getButtonStyle = (index) => {
    const type = buttonTypes[index] || "default"; // مقدار پیش‌فرض 'default'
    switch (type) {
      case "info":
        return { backgroundColor: "blue", color: "white" };
      case "success":
        return { backgroundColor: "green", color: "white" };
      case "warning":
        return { backgroundColor: "orange", color: "white" };
      case "danger":
        return { backgroundColor: "red", color: "white" };
      default:
        return { backgroundColor: "gray", color: "white" };
    }
  };

  const generateCode = () => {
    const componentCode = `
import React from 'react';

const GeneratedComponent = () => (
  return(
 <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
    ${items
      .map((item, index) => {
        if (item === "button") {
          return `<button style={{ backgroundColor: "${getButtonStyle(index).backgroundColor}", color: "${getButtonStyle(index).color}", padding: "5px 10px" }}>Button</button>`;
        } else if (item === "input") {
          return `<input type="${inputTypes[index]}" placeholder="Enter text" style={{ padding: "5px", border: "1px solid #ddd", outline: "none", borderRadius: "4px", width: "100%" }} />`;
        }
        return null;
      })
      .filter(Boolean)
      .join("\n    ")}
  </div> 
  )
);

export default GeneratedComponent;
    `;
    setGeneratedCode(componentCode);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          justifyContent: "center",
          borderBottom: "1px solid #ddd",
          position: "fixed",
          top: 0,
          zIndex: 1000,
        }}
      >
        <button
          onClick={generateCode}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Save and View Output
        </button>
      </div>
      <div style={{ display: "flex", flex: 1, marginTop: "50px" }}>
        <div
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "20px",
            boxSizing: "border-box",
            borderRight: "1px solid #ddd",
          }}
        >
          <div
            style={{
              border: "2px dashed #ddd",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={generateCode}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginBottom: "20px",
              }}
            >
              Generate Code
            </button>
            {showMainPlus && (
              <span
                onClick={handleMainPlusClick}
                style={{ fontSize: "24px", cursor: "pointer",color:"black" }}
              >
                +
              </span>
            )}
            {showRectangles && (
              <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div
                  onClick={() => handleRectangleClick(2)}
                  style={{
                    background:
                      "linear-gradient(to right, #ccc 45%, #fff 50%, #ccc 55%)",
                    height: "100px",
                    width: "100px",
                    cursor: "pointer",
                  }}
                ></div>
                <div
                  onClick={() => handleRectangleClick(1)}
                  style={{
                    backgroundColor: "#ccc",
                    height: "100px",
                    width: "100px",
                    cursor: "pointer",
                  }}
                ></div>
              </div>
            )}
            {!showMainPlus && (
              <button
                onClick={handleReset}
                style={{
                  position: "absolute",
                  top: "-15px",
                  right: "-15px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                ×
              </button>
            )}
            {!showRectangles && plusCount > 0 && (
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                {[...Array(plusCount)].map((_, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      items[index] === "button"
                        ? onButtonClick(index)
                        : onInputClick(index)
                    }
                    onDrop={(e) => handleDrop(e, index)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragLeave={handleDragLeave}
                    style={{
                      border:
                        hoveredIndex === index
                          ? "3px solid blue"
                          : "3px dashed #ddd",
                      transition: "border 0.3s ease",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "auto",
                      minWidth: "100px",
                      height: "auto",
                      minHeight: "40px",
                      cursor: "pointer",
                      fontSize: "24px",
                      padding: "10px",
                      ...(items[index] === "button" ? getButtonStyle(index) : {}),
                    }}
                  >
                    {items[index] === "input" ? (
                      <input
                        type={inputTypes[index]}
                        placeholder="Enter text"
                        style={{
                          padding: "5px",
                          border: "1px solid #ddd",
                          outline: "none",
                          borderRadius: "4px",
                          width: "100%",
                        }}
                      />
                    ) : items[index] === "button" ? (
                      <button
                        style={{ padding: "5px 10px", ...getButtonStyle(index) }}
                      >
                        Button
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            width: "30%",
            padding: "20px",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
            boxSizing: "border-box",
          }}
        >
          {generatedCode && (
            <SyntaxHighlighter language="jsx" style={darcula}>
              {generatedCode}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
