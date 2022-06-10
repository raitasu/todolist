import { v1 } from "uuid";
import { TodolistType } from "../api/todolist-api";

export type ActionType =
    | RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType;
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>;

const initialState: Array<TodolistDomainType> = [];

export type TodolistDomainType = TodolistType & {
    filter: FilterButtonType;
};
export type FilterButtonType = "all" | "active" | "completed";

export const todolistsReducer = (
    state = initialState,
    action: ActionType,
): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((td) => td.id !== action.payload.todolistId);
        case "ADD-TODOLIST":
            return [
                ...state,
                {
                    id: action.payload.todolistId,
                    title: action.payload.newTodolistTitle,
                    filter: "all",
                    addedDate: "",
                    order: 0,
                },
            ];
        case "CHANGE-TODOLIST-TITLE":
            return state.map((td) =>
                td.id === action.payload.todolistId
                    ? {
                          ...td,
                          title: action.payload.newTodolistTitle,
                      }
                    : td,
            );
        case "CHANGE-TODOLIST-FILTER":
            return state.map((td) =>
                td.id === action.payload.todolistId
                    ? {
                          ...td,
                          filter: action.payload.filterValue,
                      }
                    : td,
            );
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistId,
        },
    } as const;
};
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistTitle,
            todolistId  : v1(),
        },
    } as const;
};
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId,
            newTodolistTitle,
        },
    } as const;
};
export const changeTodolistFilterAC = (todolistId: string, filterValue: FilterButtonType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId,
            filterValue,
        },
    } as const;
};
