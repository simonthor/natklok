// YourComponent.stories.js | YourComponent.stories.jsx

import React from 'react';
import BackgroundOrbs from "features/BackgroundOrbs";

//👇 This default export determines where your story goes in the story list
export default {
  title: 'Features/BackgroundOrbs',
  component: BackgroundOrbs,
  argTypes: {
    questionBlobs: {
        table: {
            disable:true
        }
    }
  }
};

const Template = (args) => <BackgroundOrbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  hideWhenSmall: false,
  questionBlobs: false
};