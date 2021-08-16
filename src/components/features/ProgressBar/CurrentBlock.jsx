import React from "react";

const CurrentBlock = ({ lineWidth = 2}) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        background: "rgba(255,255,255,0.2)",
        boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          display: "block",
          top: 0,
          left: "-100%",
          width: "100%",
          height: lineWidth,
          background: "linear-gradient(90deg, transparent, #fff)",
          animation: "progressBarAnimationTop 4s linear infinite",
        }}
      />
      <span
        style={{
          position: "absolute",
          display: "block",
          right: 0,
          top: "-100%",
          height: "100%",
          width: lineWidth,
          background: "linear-gradient(180deg, transparent, #fff)",
          animation: "progressBarAnimationRight 4s linear infinite",
          animationDelay: "1s",
        }}
      />
      <span
        style={{
          position: "absolute",
          display: "block",
          bottom: 0,
          right: "-100%",
          width: "100%",
          height: lineWidth,
          background: "linear-gradient(270deg, transparent, #fff)",
          animation: "progressBarAnimationBottom 4s linear infinite",
          animationDelay: "2s",
        }}
      />
      <span
        style={{
          position: "absolute",
          display: "block",
          left: 0,
          bottom: "-100%",
          height: "100%",
          width: lineWidth,
          background: "linear-gradient(0deg, transparent, #fff)",
          animation: "progressBarAnimationLeft 4s linear infinite",
          animationDelay: "3s",
        }}
      />
    </div>
  );
};

export default CurrentBlock;
