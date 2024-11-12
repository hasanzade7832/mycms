"use client";
import React, { useState } from "react";
import Sidebar from "../components/mainPage/sidebar";
import MainContent from "../components/mainPage/mainBar";

const Home = () => {
  const [buttonTypes, setButtonTypes] = useState(Array(2).fill("default"));
  const [inputTypes, setInputTypes] = useState(Array(2).fill("text"));
  const [configType, setConfigType] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData("drag-item-type", type);
  };

  const handleSelectButtonType = (type) => {
    if (selectedIndex !== null) {
      const newButtonTypes = [...buttonTypes];
      newButtonTypes[selectedIndex] = type;
      setButtonTypes(newButtonTypes);
      localStorage.setItem("buttonTypes", JSON.stringify(newButtonTypes));
    }
  };

  const handleSelectInputType = (type) => {
    if (selectedIndex !== null) {
      const newInputTypes = [...inputTypes];
      newInputTypes[selectedIndex] = type;
      setInputTypes(newInputTypes);
      localStorage.setItem("inputTypes", JSON.stringify(newInputTypes));
    }
  };

  const handleButtonClick = (index) => {
    setConfigType("button");
    setSelectedIndex(index);
  };

  const handleInputClick = (index) => {
    setConfigType("input");
    setSelectedIndex(index);
  };

  const handleCloseConfig = () => {
    setConfigType(null);
    setSelectedIndex(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/8 bg-gray-300">
        <Sidebar
          onDragStart={handleDragStart}
          onSelectButtonType={handleSelectButtonType}
          onSelectInputType={handleSelectInputType}
          configType={configType}
          onClose={handleCloseConfig}
        />
      </div>
      <div className="flex-grow w-1/2 bg-white" style={{ padding: 0, margin: 0 }}>
        <MainContent
          buttonTypes={buttonTypes}
          inputTypes={inputTypes}
          setButtonTypes={setButtonTypes} // اضافه کردن setButtonTypes
          setInputTypes={setInputTypes}   // اضافه کردن setInputTypes
          onButtonClick={handleButtonClick}
          onInputClick={handleInputClick}
          setGeneratedCode={setGeneratedCode}
          generatedCode={generatedCode}
        />
      </div>
    </div>
  );
};

export default Home;
