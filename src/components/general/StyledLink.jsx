import React from "react";

const StyledLink = ({ children, href, style }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "white",
      fontWeight: 500,
      textDecoration: "none",
      cursor: "pointer",
      ...style,
    }}
  >
    {children}
  </a>
);

export default StyledLink;
