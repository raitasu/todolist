import React from "react";
import { FilterButtonType, TaskType } from "./App";
import "./App.css";
import classes from "./Todolist.module.css";
import AddItemForm from "./Components/AddItemForm";
import EditableSpan from "./Components/EditableSpan";

type PropsType = {
    id: string;
    title: string;
    filterTasks: Array<TaskType>;
    removeTask: (todolistId: string, id: string) => void;
    changeFilter: (value: FilterButtonType, todolistId: string) => void;
    addTask: (todolistId: string, newTitle: string) => void;
    changeStatus: (todolistId: string, id: string, checked: boolean) => void;
    filter: string;
    removeTodolist: (todolistid: string) => void;
    changeTitleTask: (todolistId: string, id: string, newTitle: string) => void;
    onChangeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

const Todolist = (props: PropsType) => {
    const onChangeStatusHandler = (todolistId: string, newId: string, value: boolean) => {
        props.changeStatus(todolistId, newId, value);
    };
    const onChangeTodolistTitleHandler = (newTitle: string) => {
        props.onChangeTodolistTitle(props.id, newTitle);
    };
    const methodMap = props.filterTasks.map((task) => {
        const onChangeTaskTitle = (newTitle: string) => {
            props.changeTitleTask(props.id, task.id, newTitle);
        };

        return (
            <li key={task.id}>
                <button
                    onClick={() => {
                        props.removeTask(props.id, task.id);
                    }}
                >
                    Delete
                </button>
                <input
                    type={"checkbox"}
                    checked={task.isDone}
                    onChange={(event) =>
                        onChangeStatusHandler(props.id, task.id, event.currentTarget.checked)
                    }
                />
                <EditableSpan title={task.title} onChange={onChangeTaskTitle} />
            </li>
        );
    });

    const onClickHandler = (value: FilterButtonType) => {
        props.changeFilter(value, props.id);
    };
    const addTask = (title: string) => {
        props.addTask(props.id, title);
    };
    return (
        <div>
            <div className={classes.todolistTitle}>
                <h1>
                    <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler} />
                </h1>

                <div>
                    <button
                        onClick={() => {
                            props.removeTodolist(props.id);
                        }}
                    >
                        X
                    </button>
                </div>
            </div>

            <AddItemForm callback={addTask} />
            <div>
                <ul>{methodMap}</ul>
            </div>
            <div>
                <button
                    className={"active_item"}
                    onClick={() => {
                        onClickHandler("All");
                    }}
                >
                    All
                </button>
                <button
                    className={"active_item"}
                    onClick={() => {
                        onClickHandler("Active");
                    }}
                >
                    Active
                </button>
                <button
                    className={"active_item"}
                    onClick={() => {
                        onClickHandler("Completed");
                    }}
                >
                    Completed
                </button>
            </div>
        </div>
    );
};
export default Todolist;
