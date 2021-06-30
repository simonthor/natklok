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
