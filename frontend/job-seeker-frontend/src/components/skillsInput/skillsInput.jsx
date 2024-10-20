import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon from react-icons
import styles from "./skillsInput.module.css"

export default function SkillsInput  ({id, onChange, data, skillStyle}) {
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
    <div id={id} className={styles.skillContainer}>
      <input
        id={id}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a skill and press Enter"
        className={skillStyle}
      />

      <div className={styles.skillRow}>
        {skills.map((skill, index) => (
          <div
            key={index}
            style={{
              display: "inline-flex",
              alignItems: "center",
              margin: "5px",
              padding: "3px 5px",
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
