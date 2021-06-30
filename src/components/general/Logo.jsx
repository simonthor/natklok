import React from "react";

const Logo = ({ large }) => {
  return (
    <i
      style={{
        fontSize: large ? "2em" : "1.2em",
        fontFamily: "Courier New",
        fontWeight: 700,
        color: "white",
        "text-shadow": "1px 1px #8da6eb",
      }}
    >
      SäkerhetsKontrollen
    </i>
  );
};

export default Logo;
