import axios from "axios";

type TodolistType = {
    id: string;
    addedDate: string;
    order: number;
    title: string;
};

type ResponseType<D={}> = {
    data: D;
    messages: Array<String>;
    fieldsErrors: Array<string>;
    resultCode: number;
};

type TaskType = {
    id: string;
    title: string;
    description: string;
    todoListId: string;
    order: number;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    addedDate: string;
};
type GetResponseTaskType = {
    items: Array<TaskType>;
    totalCount: number;
    error: string;
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
        return instance.post<
            any,
            ResponseType<{ item: TodolistType }>,
            { title: string }
        >("/todo-lists", { title });
    },
    deleteTodolists(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolists(todolistId: string, title: string) {
        return instance.put<any, ResponseType, { title: string }>(
            `/todo-lists/${todolistId}`,
            { title },
        );
    },

    getTasks(todolistId: string) {
        return instance.get<GetResponseTaskType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks`,
            {
                title,
            },
        );
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
        );
    },
    updateTitleTask(
        todolistId: string,
        taskId: string,
        obj: { title: string},
    ) {
        return instance.put<ResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            obj,
        );
    },
};
