import React from "react";
import ProgressBar from "./../components/features/ProgressBar";

export default {
  component: ProgressBar,
  title: "Components/Button",
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

export const Primary = () => (
  <ProgressBar totalQuestions={3} currentQuestionIndex={2} />
);
