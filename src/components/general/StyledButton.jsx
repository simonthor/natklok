import React, { useState } from "react";
import { PURPLE,PALEBLUE } from "util/constants";


export default ({
  children,
  style,
  color = PALEBLUE,
  onClick,
  disabled = false,
  cinematicColor
}) => {
  const [hoveringOver, setHoveringOver] = useState(false);

  function handleMouseChange(isonTop) {
    if (isonTop) {
      if (cinematicColor) {
        document.getElementById("bgd-container").style.background = cinematicColor;
      }
      setHoveringOver(true);
    } else {
      if (cinematicColor) {
        document.getElementById("bgd-container").style.background = PURPLE;
      }
      setHoveringOver(false);
    }
  }

  return (
    <div
      onMouseEnter={() => handleMouseChange(true)}
      onMouseLeave={() => handleMouseChange(false)}
      onClick={disabled ? null : onClick}
      style={{
        borderRadius: 4,
        cursor: "pointer",
        fontSize: "1.1em",
        background: !disabled ? color : "#3c3abb",
        filter: hoveringOver && !disabled ? "brightness(1.05)" : "none",
        scale: hoveringOver && !disabled ? "1.03" : "1",
        color: PURPLE,
        padding: "14px 40px",
        fontWeight: "800",
        display: "inline-block",
        margin: 0,
        transition: "0.3s ease-in-out",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
