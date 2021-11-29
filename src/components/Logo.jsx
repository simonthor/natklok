import React from "react";
import SSF from "assets/sakerhetskollen_logo.svg";
import Title from "./typeography/Title";

const Logo = ({ sm }) => {
  let largeSize = window.innerWidth < 576 ? 46 : 72;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {sm !== true && (
        <div>
          <img src={SSF} alt="" style={{ width: 160 }} />
        </div>
      )}

      <div style={{ maxWidth: "400px", padding: "0 2em", margin: "0 auto" }}>
        <Title style={{ fontSize: sm ? 20 : largeSize }}>
          <i>NÄTKLOK</i>
        </Title>
      </div>
    </div>
  );
};

export default Logo;
