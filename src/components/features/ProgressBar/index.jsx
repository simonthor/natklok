import { Grid } from "@material-ui/core";
import React from "react";
import CurrentBlock from "./CurrentBlock";

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
      <CurrentBlock />
      <UnCompletedBlocks />
    </Grid>
  );
};

export default ProgressBar;
