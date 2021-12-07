import React from "react";
import Logo from "components/Logo";

export default {
	component: Logo,
	title: "Components/Logo",
	decorators: [
		(Story) => (
			<div
				style={{
					textAlign: "center",
					flex: 1,
				}}
			>
				<Story />
			</div>
		),
	],
};

export const Default = Logo.bind({});
Default.parameters = {
	controls: { hideNoControlsWarning: true },
};
