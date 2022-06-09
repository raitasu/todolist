import React from "react";
import { Provider } from "react-redux";
import { tasksReducer } from "../../State/tasks-reducer";
import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../../State/todolists-reducer";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "../../api/todolist-api";
import { AppStateType } from "../../State/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

const initialGlobalState : AppStateType = {
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: 'all', addedDate: '', order: 0 },
        { id: "todolistId2", title: "What to buy", filter: 'all', addedDate: '', order: 0 },
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                description: "",
                todoListId: "todolistId2",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "",
            },
        ],
    },
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
