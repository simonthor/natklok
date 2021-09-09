import React from "react";
// Custom
import { Logo } from ".";
import { PURPLE } from "../../util/constants";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        flex: 1,
        background: PURPLE,
        height: "100vh",
        width: "100vw",
        paddingTop: "30%",
      }}
    >
      <Logo />
    </div>
  );
};

export default Loading;
