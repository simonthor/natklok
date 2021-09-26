import React from "react";
import { getWindowSize } from "util";

const Title = ({ children, style }) => {
  let fontSize = 32;
  if (window.innerWidth < 400) {
    fontSize = 24;
  }

  return (
    <h1
      style={{
        marginTop: 8,
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: fontSize,
        fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
        fontWeight: 300,
        lineHeight: 1.2,
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

export default Title;
