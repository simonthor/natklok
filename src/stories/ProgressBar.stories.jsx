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
	argTypes: {
		totalQuestions: {
			description: "Count of total questions",
			table: {
				type: {
					summary: "int",
				},
			},
		},
		currentQuestionIndex: {
			description: "Current question, starting from 0",
			table: {
				type: {
					summary: "int",
				},
			},
		},
	},
};

export const Default = ProgressBar.bind({});
Default.args = {
	totalQuestions: 3,
	currentQuestionIndex: 2,
};
