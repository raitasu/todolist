import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";
import { v1 } from "uuid";

export type FilterButtonType = "All" | "Active" | "Completed";

export type TodolistType = {
    id: string;
    title: string;
    filter: string;
};
export type TasksStateType = {
    [key: string]: Array<TaskType>;
};
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

function App() {
    let todolist1 = v1();
    let todolist2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolist1, title: "What to learn ? ", filter: "all" },
        { id: todolist2, title: "What to buy ? ", filter: "all" },
    ]);
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolist1]: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: false },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "REACT", isDone: false },
        ],
        [todolist2]: [
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Cheese", isDone: false },
        ],
    });

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((todolist) => todolist.id !== todolistId));
        delete tasks[todolistId];
        setTasks({ ...tasks });
    };

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId),
        });
    };

    const changeFilter = (value: FilterButtonType, todolistId: string) => {
        setTodolists(
            todolists.map((todolist) =>
                todolist.id === todolistId ? { ...todolist, filter: value } : todolist,
            ),
        );
    };

    const addTask = (todolistId: string, newTitle: string) => {
        const newTask = { id: v1(), title: newTitle, isDone: false };
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
    };

    const changeTaskStatus = (todolistId: string, id: string, checked: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map((task) =>
                task.id === id ? { ...task, isDone: checked } : task,
            ),
        });
    };

    return (
        <div className="App">
            {todolists.map((todolist) => {
                let filterTasks = tasks[todolist.id];

                if (todolist.filter === "Active") {
                    filterTasks = filterTasks.filter((el) => !el.isDone);
                }
                if (todolist.filter === "Completed") {
                    filterTasks = filterTasks.filter((el) => el.isDone);
                }

                return (
                    <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        filterTasks={filterTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                );
            })}
        </div>
    );
}

export default App;
