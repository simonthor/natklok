import React from "react";

const StyledLink = ({
  children,
  href,
  style,
  rel = "noopener noreferrer",
  target = "_blank",
}) => (
  <a
    href={href}
    target={target}
    rel={rel}
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
