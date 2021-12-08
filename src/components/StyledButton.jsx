import React, { useState } from "react";
import { PURPLE, PINK } from "util/constants";

import "index.css";

const StyledButton = ({
  children,
  style,
  color = PINK,
  onClick,
  caps,
  disabled = false,
  cinematicColor,
}) => {
  const [hoveringOver, setHoveringOver] = useState(false);

  let filter = "none";
  if (hoveringOver && !disabled) {
    filter = "brightness(1.16)";
  } else if (disabled === true) {
    filter = "brightness(0.6)";
  }

  function handleMouseChange(isonTop) {
    if (isonTop) {
      if (cinematicColor) {
        document.body.style.background = cinematicColor;
      }
      setHoveringOver(true);
    } else {
      if (cinematicColor) {
        document.body.style.background = PURPLE;
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
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Dagny",
        background: color,
        filter: filter,
        transform: hoveringOver && !disabled ? "scale(1.03)" : "scale(1)",
        color: disabled ? "lightgrey" : "white",
        padding: "12px 12px",
        border: "none",
        display: "inline-block",
        margin: 0,
        transition: "all 0.3s ease-in-out",
        boxSizing: "border-box",
        textAlign: "center",
        textTransform: caps ? "uppercase" : "auto",

        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default StyledButton;
