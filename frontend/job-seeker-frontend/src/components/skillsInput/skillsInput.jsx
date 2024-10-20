import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon from react-icons

export default function SkillsInput  ({onChange, value}) {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onChange(skills)
  }, [skills])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue) {
        e.preventDefault()
        setSkills([...skills, inputValue]);
        setInputValue("");
    }
  };

  const handleRemoveSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a skill and press Enter"
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      <div style={{ marginTop: "10px" }}>
        {skills.map((skill, index) => (
          <div
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              margin: "5px",
              padding: "5px 10px",
              backgroundColor: "#f1f1f1",
              borderRadius: "20px",
              fontSize: "14px"
            }}
          >
            {skill}
            <AiOutlineClose
              style={{ marginLeft: "10px", cursor: "pointer", color: "red" }}
              onClick={() => handleRemoveSkill(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
