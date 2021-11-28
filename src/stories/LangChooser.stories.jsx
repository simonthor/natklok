import React from "react";
import LangChooser from "features/LangChooser";

export default {
  component: LangChooser,
  title: "Features/LangChooser",
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

export const Default = LangChooser.bind({});
