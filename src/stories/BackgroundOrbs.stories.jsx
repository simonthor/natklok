// YourComponent.stories.js | YourComponent.stories.jsx

import React from "react";
import BackgroundOrbs from "features/BackgroundOrbs";

//👇 This default export determines where your story goes in the story list
export default {
	title: "Features/BackgroundOrbs",
	component: BackgroundOrbs,
	argTypes: {
		hideWhenSmall: {
			description: "Don't render the component when document.window.width < 1000",
      table: {
        type: {
          summary: "bool",
        },
      },
		},
    questionBlobs: {
			description: "if true, blobs are displayed behind a question, and opacity, position, quantity, and size is changed.",
      table: {
        type: {
          summary: "bool",
        },
      },
		},
	},
};

const Template = (args) => <BackgroundOrbs {...args} />;

export const Default = Template.bind({});
Default.args = {
	hideWhenSmall: false,
	questionBlobs: false,
};
