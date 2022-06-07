import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
    title: "API",
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => {
            setState(res.data);
        });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.createTodolists("Todo-1").then((res) => {
            setState(res.data);
        });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.deleteTodolists("99cae908-ccac-456f-8160-fe08eb6fb67c").then((res) => {
            setState(res.data);
        });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI
            .updateTodolists("10731f55-4e0d-43fa-b1f8-8612604142ba", "TODOLIST-1")
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};
