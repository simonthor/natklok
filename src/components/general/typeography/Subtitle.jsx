import React from "react";

const Subtitle = ({ children, style, onClick }) => {
  let fontSize = 24;
  let marginBottom = 12;
  if (window.innerWidth < 400) {
    fontSize = 20;
    marginBottom = 6;
  }

  return (
    <h2
      style={{
        fontFamily: "Dagny",
        fontSize,
        marginBottom,
        marginTop: 8,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

export default Subtitle;
