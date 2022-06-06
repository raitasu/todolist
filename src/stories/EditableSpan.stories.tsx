import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import AddItemForm from "../Components/AddItemForm";
import { action } from "@storybook/addon-actions";
import { Task } from "../Task";
import { v1 } from "uuid";
import EditableSpan from "../Components/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Todolist/EditableSpan",
    component: EditableSpan,
    args: {
        onChange: action("Title wants to change"),
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const FirstEditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FirstEditableSpanStory.args = {
    title: "First title",
};
export const SecondEditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
SecondEditableSpanStory.args = {
    title: "Second title",
};
