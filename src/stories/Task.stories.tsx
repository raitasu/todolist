import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
import AddItemForm from "../Components/AddItemForm";
import { action } from "@storybook/addon-actions";
import { Task } from "../Task";
import { v1 } from "uuid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Todolist/Task",
    component: Task,
    args: {
        todolistId: v1(),
        changeTitleTask: action("Task wants to change"),
        onChangeStatusHandler: action("Task wants to change"),
        removeTask: action("Task wants to delete"),
    },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: { id: v1(), title: "FirstTask", isDone: true },
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: { id: v1(), title: "SecondTask", isDone: false },
};
