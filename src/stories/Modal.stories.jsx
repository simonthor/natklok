import React, { useState } from "react";
import Modal from "components/Modal";

export default {
	component: Modal,
	title: "Components/Modal",

};

const Template = (args) => {
    const [open, setOpen] = useState(false);
    return (
        <Modal open={open} setOpen={setOpen} {...args} />
    )
};

export const Default = Template.bind({});
Default.args = {
	title: "Läs mer om romansbedrägerier",
	children: "<h1>Hej</h1>",
    open: false
};
