import { v1 } from "uuid";
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistType, SetTodolistType } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolist-api";
import { AppActionType } from "./store";

export type TasksActionsType =
    | RemoveTasksType
    | AddTasksType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | SetTodolistType;
export type RemoveTasksType = ReturnType<typeof removeTasksAC>;
export type AddTasksType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case "ADD-TASK":
            let newTask: TaskType = {
                id: v1(),
                title: action.newTaskTitle,
                status: TaskStatuses.New,
                description: "",
                todoListId: action.todolistId,
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "",
            };
            return { ...state, [action.todolistId]: [newTask, ...state[action.todolistId]] };
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) =>
                    t.id === action.taskId
                        ? {
                              ...t,
                              status: action.status,
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
        case "SET-TODOLIST":
            const stateCopy = { ...state };
            action.payload.todolists.forEach((td) => {
                stateCopy[td.id] = [];
            });
            return stateCopy;
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskId: taskId,
        status: status,
        todolistId: todolistId,
    } as const;
};
