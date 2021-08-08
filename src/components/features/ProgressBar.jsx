import { Grid } from "@material-ui/core";
import React from "react";

const ProgressBar = ({ t, currentQuestionIndex = 1, totalQuestions = 1 }) => {
  const CompletedBlocks = () => {
    return [...Array(currentQuestionIndex - 1)].map((e, i) => (
      <div
        style={{ height: "100%", width: "100%", background: "white" }}
        key={i}
      ></div>
    ));
  };

  const UnCompletedBlocks = () => {
    return [...Array(totalQuestions - currentQuestionIndex)].map((e, i) => (
      <div
        style={{ height: "100%", width: "100%", background: "rgba(0,0,0,0.3)" }}
        key={i}
      ></div>
    ));
  };

  const CurrentBlock = () => {
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
          <span style={{
              position: "absolute",
              display: "block",
              top: 0,
              left: "-100%",
              width: "100%",
              height: 2,
              background: "linear-gradient(90deg, transparent, #fff)",
              animation: "progressBarAnimationTop 4s linear infinite",
          }}></span>
          <span style={{
              position: "absolute",
              display: "block",
              right: 0,
              top: "-100%",
              height: "100%",
              width: 2,
              background: "linear-gradient(180deg, transparent, #fff)",
              animation: "progressBarAnimationRight 4s linear infinite",
              animationDelay: "1s"
          }}></span>
          <span style={{
              position: "absolute",
              display: "block",
              bottom: 0,
              right: "-100%",
              width: "100%",
              height: 2,
              background: "linear-gradient(270deg, transparent, #fff)",
              animation: "progressBarAnimationBottom 4s linear infinite",
              animationDelay: "2s"
          }}></span>
          <span style={{
              position: "absolute",
              display: "block",
              left: 0,
              bottom: "-100%",
              height: "100%",
              width: 2,
              background: "linear-gradient(0deg, transparent, #fff)",
              animation: "progressBarAnimationLeft 4s linear infinite",
              animationDelay: "3s"
          }}></span>
      </div>
    );
  };

  return (
    <Grid
      container
      style={{
        height: 6,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
        gridGap: 3,
      }}
    >
      <CompletedBlocks />
      <CurrentBlock/>
      <UnCompletedBlocks />
    </Grid>
  );
};

export default ProgressBar;
