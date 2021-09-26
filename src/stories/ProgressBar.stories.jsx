import React from "react";
import ProgressBar from "components/features/ProgressBar";

export default {
  component: ProgressBar,
  title: "Components/ProgressBar",
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

export const Primary = ProgressBar.bind({});
Primary.args = {
   height: 6,
   totalQuestions: 3,
   currentQuestionIndex: 2,
   lineWidth: 2
};
