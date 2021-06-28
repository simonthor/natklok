import React, { useState } from "react";
import { PURPLE,PALEBLUE } from "../../util/constants";


export default ({
  children,
  style,
  color = PALEBLUE,
  onClick,
}) => {
  const [hoveringOver, setHoveringOver] = useState(false);

  return (
    <div
      onMouseEnter={() => setHoveringOver(true)}
      onMouseLeave={() => setHoveringOver(false)}
      onClick={onClick}
      style={{
        borderRadius: 4,
        cursor: "pointer",
        background: color,
        filter: hoveringOver ? "brightness(1.1)" : "none",
        scale: hoveringOver ? "1.05" : "1",
        color: PURPLE,
        padding: "12px 40px",
        fontWeight: "bold",
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
