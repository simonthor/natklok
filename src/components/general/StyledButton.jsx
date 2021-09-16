import React, { useState } from "react";
import { PURPLE, PALEBLUE } from "util/constants";

export default ({
  children,
  style,
  color = PALEBLUE,
  onClick,
  disabled = false,
  cinematicColor,
}) => {
  const [hoveringOver, setHoveringOver] = useState(false);

  function handleMouseChange(isonTop) {
    if (isonTop) {
      if (cinematicColor) {
        document.getElementById("bgd-container").style.background =
          cinematicColor;
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
    <button
      onMouseEnter={() => handleMouseChange(true)}
      onMouseLeave={() => handleMouseChange(false)}
      onClick={disabled ? null : onClick}
      style={{
        borderRadius: 100,
        cursor: "pointer",
        fontSize: "1.1em",
        background: !disabled ? color : "#3c3abb",
        filter: hoveringOver && !disabled ? "brightness(1.16)" : "none",
        transform: hoveringOver && !disabled ? "scale(1.03)" : "scale(1)",
        color: PURPLE,
        padding: "14px 40px",
        border: "none",
        fontWeight: "800",
        display: "inline-block",
        margin: 0,
        transition: "all 0.3s ease-in-out",
        boxSizing: "border-box",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
