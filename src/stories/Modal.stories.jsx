import React, { useState } from "react";
import Modal from "components/Modal";

export default {
	component: Modal,
	title: "Components/Modal",
};

const Template = (args) => {
	const [open, setOpen] = useState(false);
	return (
		<div style={{ color: "black" }}>
			<Modal open={open} setOpen={setOpen} {...args} />
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	title: "Surfa online",
	children: (
		<div style={{ padding: "0 20px" }}>
			<p>
				Vad sitter i mitten av world wide web? En väldigt, väldigt stor
				spindel!
			</p>
		</div>
	),
	open: true,
};
