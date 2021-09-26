import React from "react";

const Subtitle = ({ children, style, onClick }) => {
  return (
    <h2 style={{ ...style }} onClick={onClick}>
      {children}
    </h2>
  );
};

export default Subtitle;
