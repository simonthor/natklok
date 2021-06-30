import React from "react";
// Custom
import { Logo } from ".";
import { HEIGHT, PURPLE } from "../../util/constants";

const Loading = ({ fullScreen }) => {
  return (
    <div
      style={{
        textAlign: "center",
        flex: 1,
        background: PURPLE,
        height: fullScreen ? HEIGHT : 0,
        paddingTop: fullScreen ? HEIGHT / 3 : 0,
      }}
    >
      <Logo />
    </div>
  );
};

export default Loading;
