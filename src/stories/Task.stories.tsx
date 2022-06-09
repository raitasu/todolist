import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { Task } from "../Task";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

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
    task: {
        id: v1(),
        title: "FirstTask",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        addedDate: "",
    },
};
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {
        id: v1(),
        title: "SecondTask",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: "todolistId1",
        order: 0,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        addedDate: "",
    },
};
