import React from "react";

const SmallText = ({ children, style, xs = false, opacity = false }) => {
  return (
    <p
      style={{
        opacity: opacity ? 0.6 : 1,
        fontSize: xs ? "0.6em" : "0.8em",
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default SmallText;
