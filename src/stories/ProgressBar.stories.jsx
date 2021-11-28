import React from "react";
import ProgressBar from "features/ProgressBar";

export default {
  component: ProgressBar,
  title: "Features/ProgressBar",
  decorators: [
    (Story) => (
      <div
        style={{
          width: "70vw",
          padding: "5rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Default = ProgressBar.bind({});
Default.args = {
  height: 6,
  totalQuestions: 3,
  currentQuestionIndex: 2,
  lineWidth: 2,
};
