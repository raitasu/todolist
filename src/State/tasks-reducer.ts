import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistType } from "./todolists-reducer";

export type ActionType =
    | RemoveTasksType
    | AddTasksType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType;
export type RemoveTasksType = ReturnType<typeof removeTasksAC>;
export type AddTasksType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case "ADD-TASK":
            let newTask = { id: v1(), title: action.newTaskTitle, isDone: false };
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId
                        ? {
                              ...t,
                              isDone: action.statusValue,
                          }
                        : t,
                ),
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId
                        ? {
                              ...t,
                              title: action.newTaskTitle,
                          }
                        : t,
                ),
            };
        case "ADD-TODOLIST":
            return { ...state, [action.payload.todolistId]: [] };
        default:
            return state;
    }
};

export const removeTasksAC = (taskId: string, todolistId: string) => {
    return {
        type: "REMOVE-TASKS",
        todolistId: todolistId,
        taskId: taskId,
    } as const;
};
export const addTaskAC = (newTaskTitle: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        newTaskTitle: newTaskTitle,
        todolistId: todolistId,
    } as const;
};
export const changeTaskTitleAC = (taskId: string, newTaskTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskId,
        todolistId,
        newTaskTitle,
    } as const;
};
export const changeTaskStatusAC = (taskId: string, statusValue: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId: taskId,
        statusValue: statusValue,
        todolistId: todolistId,
    } as const;
};
