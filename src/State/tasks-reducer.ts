import { TasksStateType } from "../AppWithRedux";
import { AddTodolistType, SetTodolistType } from "./todolists-reducer";
import { TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
import { AppActionType, AppStateType } from "./store";
import { Dispatch } from "redux";

export type TasksActionsType =
    | RemoveTasksType
    | AddTasksType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistType
    | SetTodolistType
    | SetTasksType;
export type RemoveTasksType = ReturnType<typeof removeTasksAC>;
export type AddTasksType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksType = ReturnType<typeof setTasksAC>;

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: AppActionType) => {
    switch (action.type) {
        case "REMOVE-TASKS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
            };
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.payload.task.todoListId];
            stateCopy[action.payload.task.todoListId] = [action.payload.task, ...tasks];
            return stateCopy;
        }
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
        case "SET-TASKS":
            return { ...state, [action.payload.todolistId]: action.payload.tasks };
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
export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            task,
        },
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

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {
        type: "SET-TASKS",
        payload: {
            todolistId,
            tasks,
        },
    } as const;
};

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId).then((response) => {
            dispatch(setTasksAC(todolistId, response.data.items));
        });
    };
};

export const deleteTaskTC = (todolistId: string, tasksId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, tasksId).then((response) => {
            dispatch(removeTasksAC(tasksId, todolistId));
        });
    };
};

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title).then((response) => {
            dispatch(addTaskAC(response.data.data.item));
        });
    };
};
export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId];
        const task = tasksForCurrentTodolist.find((t) => {
            return t.id === taskId;
        });
        if (task) {
            todolistAPI
                .updateTask(todolistId, taskId, {
                    title: task.title,
                    startDate: task.startDate,
                    priority: task.priority,
                    description: task.description,
                    deadline: task.deadline,
                    status: status,
                })
                .then(() => {
                    const action = changeTaskStatusAC(taskId, status, todolistId);
                    dispatch(action);
                });
        }
    };
};
