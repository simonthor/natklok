import React, { useState } from "react";
import { PURPLE,PALEBLUE } from "../../util/constants";


export default ({
  children,
  style,
  color = PALEBLUE,
  onClick,
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
      onClick={onClick}
      style={{
        borderRadius: 4,
        cursor: "pointer",
        fontSize: "1.1em",
        background: color,
        filter: hoveringOver ? "brightness(1.05)" : "none",
        scale: hoveringOver ? "1.03" : "1",
        color: PURPLE,
        padding: "14px 50px",
        fontWeight: "800",
        display: "inline-block",
        margin: 0,
        transition: "0.3s ease-in-out",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
