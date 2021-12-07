// YourComponent.stories.js | YourComponent.stories.jsx

import React from "react";
import { PINK, LIGHT_BLUE } from "util/constants";
import StyledButton from "components/StyledButton";

//👇 This default export determines where your story goes in the story list
export default {
	title: "Components/StyledButton",
	component: StyledButton,
	argTypes: {
		children: {
			description: "What should be rendered inside the button",
			table: {
				type: {
					summary: "HTMLElement",
				},
			},
		},
	},
};

export const Small = StyledButton.bind({});
Small.args = {
	children: "Läs mer",
	style: {
		boxShadow: "0px 0px 8px 8px rgba(33, 32, 88, 0.2)",
		paddingLeft: 20,
		paddingRight: 20,
	},
	color: LIGHT_BLUE,
	caps: false,
	disabled: false,
};

export const Big = StyledButton.bind({});
Big.args = {
	children: "Starta testet",
	style: {
		boxShadow: "0px 0px 8px 8px rgba(33, 32, 88, 0.2)",
		paddingLeft: 32,
		paddingRight: 32,
	},
	color: PINK,
	caps: true,
	disabled: false,
};

export const Disabled = StyledButton.bind({});
Disabled.args = {
	children: "Starta testet",
	style: {
		paddingLeft: 32,
		paddingRight: 32,
	},
	color: PINK,
	caps: true,
	disabled: true,
};
