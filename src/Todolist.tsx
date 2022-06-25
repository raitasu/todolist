import React, { memo, useCallback, useEffect } from "react";
import "./App.css";
import classes from "./Todolist.module.css";
import AddItemForm from "./Components/AddItemForm";
import EditableSpan from "./Components/EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Task } from "./Task";
import ClearIcon from "@mui/icons-material/Clear";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import { FilterButtonType } from "./State/todolists-reducer";
import { useAppDispatch } from "./State/hooks";
import { addTaskTC, getTasksTC } from "./State/tasks-reducer";

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistId: string, id: string) => void;
    changeFilter: (value: FilterButtonType, todolistId: string) => void;
    addTask: (todolistId: string, newTitle: string) => void;
    changeStatus: (todolistId: string, id: string, status: TaskStatuses) => void;
    filter: string;
    removeTodolist: (todolistid: string) => void;
    changeTitleTask: (todolistId: string, id: string, newTitle: string) => void;
    onChangeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

const Todolist = memo((props: PropsType) => {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(getTasksTC(props.id))
  }, [])

    const onChangeStatusHandler = useCallback(
        (todolistId: string, newId: string, status: TaskStatuses) => {
            props.changeStatus(todolistId, newId, status);
        },
        [props.changeStatus, props],
    );
    const onChangeTodolistTitleHandler = useCallback(
        (newTitle: string) => {
            props.onChangeTodolistTitle(props.id, newTitle);
        },
        [props.onChangeTodolistTitle, props.id],
    );

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.Completed);
    }

    const onClickHandler = useCallback(
        (value: FilterButtonType) => {
            props.changeFilter(value, props.id);
        },
        [props.changeFilter, props.id],
    );
    const addTask = useCallback(
        (title: string) => {
          dispatch(addTaskTC(props.id, title))
            // props.addTask(props.id, title);
        },
        [props.addTask, props.id],
    );

    return (
        <div>
            <div className={classes.todolistTitle}>
                <h1>
                    <EditableSpan title={props.title} onChange={onChangeTodolistTitleHandler} />
                </h1>

                <div>
                    <IconButton
                        onClick={() => {
                            props.removeTodolist(props.id);
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </div>
            </div>

            <AddItemForm callback={addTask} />
            <div>
                <div>
                    {tasksForTodolist.map((task) => (
                        <Task
                            key={task.id}
                            todolistId={props.id}
                            task={task}
                            changeTitleTask={props.changeTitleTask}
                            onChangeStatusHandler={onChangeStatusHandler}
                            removeTask={props.removeTask}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Button
                    style={{ color: "DimGrey" }}
                    variant={props.filter === "all" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={() => {
                        onClickHandler("all");
                    }}
                >
                    All
                </Button>
                <Button
                    style={{ color: "DimGrey" }}
                    variant={props.filter === "active" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={() => {
                        onClickHandler("active");
                    }}
                >
                    Active
                </Button>
                <Button
                    style={{ color: "DimGrey" }}
                    variant={props.filter === "completed" ? "outlined" : "text"}
                    color={"primary"}
                    onClick={() => {
                        onClickHandler("completed");
                    }}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});
export default Todolist;
