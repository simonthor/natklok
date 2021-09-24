import React from "react";
import Mainlogo from "assets/sakerhetskontrollen-logo.svg";
import SSF from "assets/sakerhetskollen_logo.svg";

const Logo = ({ large }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <img src={SSF} alt="" style={{ width: 160 }} />
      </div>
      <div style={{ maxWidth: "400px", padding: "0 2em", margin: "0 auto" }}>
        <img
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          alt="Säkerhetskontrollen"
          src={Mainlogo}
        />
      </div>
    </div>
  );
};

export default Logo;
