import React, { useState } from "react";
import Modal from "components/Modal";

export default {
	component: Modal,
	title: "Components/Modal",

};

const Template = (args) => {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ color: "black"}}>
            <Modal open={open} setOpen={setOpen} {...args} />
        </div>
    )
};

export const Default = Template.bind({});
Default.args = {
	title: "Läs mer om romansbedrägerier",
	children: "<h1>Hej</h1>",
    open: true
};
