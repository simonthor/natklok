import React from "react";
import SSF from "assets/sakerhetskollen_logo.svg";
import Title from "./typeography/Title";
import GetWindowSize from "util/getWindowSize";

const Logo = ({ sm }) => {
  const windowSize = GetWindowSize();
  let largeSize = windowSize.width > 660 ? 72 : 46;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {sm !== true && (
        <div>
          <img src={SSF} alt="" style={{ width: 160 }} />
        </div>
      )}

      <div style={{ margin: "0 auto" }}>
        <Title style={{ fontSize: sm ? 20 : largeSize }}>
          <i>NÄTKLOK</i>
        </Title>
      </div>
    </div>
  );
};

export default Logo;
