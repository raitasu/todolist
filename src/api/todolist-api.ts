import axios from "axios";

type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};
type BaseResponseType<D> = {
    resultCode: number;
    messages: Array<string>;
    fieldsErrors: Array<string>;
    data: D;
};
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "abaf6d7d-3636-4277-82e8-cbf95a909917",
    },
});

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists/`);
    },
    createTodolists(title: string) {
        return instance.post<any, BaseResponseType<{ item: TodolistType }>, { title: string }>(
            "/todo-lists",
            { title },
        );
    },
    deleteTodolists(todolistId: string) {
        return instance.delete<BaseResponseType<{}>>(`/todo-lists/${todolistId}`);
    },
    updateTodolists(todolistId: string, title: string) {
        return instance.put<any, BaseResponseType<{}>, { title: string }>(
            `/todo-lists/${todolistId}`,
            { title },
        );
    },
};
