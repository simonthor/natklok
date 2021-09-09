import React from "react";
// Custom
import { Logo } from ".";
import { HEIGHT, PURPLE } from "../../util/constants";

const Loading = () => {
  return (
    <div
      style={{
        textAlign: "center",
        flex: 1,
        background: PURPLE,
        height: HEIGHT === 0 ? 0 : HEIGHT,
        paddingTop: HEIGHT === 0 ? 0 : HEIGHT / 3,
      }}
    >
      <Logo />
    </div>
  );
};

export default Loading;
