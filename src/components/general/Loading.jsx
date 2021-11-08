import React from "react";
// Custom
import { Logo } from ".";
import { PURPLE } from "util/constants";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        flex: 1,
        background: PURPLE,
        height: "-webkit-fill-available",
        width: "100vw",
        paddingTop: "20vh",
      }}
    >
      <Logo />
    </div>
  );
};

export default Loading;
