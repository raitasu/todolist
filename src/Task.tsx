import React, { ChangeEvent, memo, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditableSpan from "./Components/EditableSpan";
import classes from "./Task.module.css";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import { useAppDispatch } from "./State/hooks";
import { deleteTaskTC } from "./State/tasks-reducer";

type TaskPropsType = {
    todolistId: string;
    task: TaskType;
    changeTitleTask: (todolistId: string, taskId: string, newTitle: string) => void;
    onChangeStatusHandler: (todolistId: string, taskId: string, status: TaskStatuses) => void;
    removeTask: (todolistId: string, taskId: string) => void;
};
export const Task = memo((props: TaskPropsType) => {

  const dispatch = useAppDispatch()


  const onChangeTaskTitle = useCallback(
        (newTitle: string) => {
            props.changeTitleTask(props.todolistId, props.task.id, newTitle);
        },
        [props.changeTitleTask, props.todolistId, props.task.id],
    );
    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            props.onChangeStatusHandler(
                props.todolistId,
                props.task.id,
                event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
            ),
        [props.onChangeStatusHandler, props.todolistId, props.task.id],
    );
    const onClickHandler = useCallback(() => {
      dispatch(deleteTaskTC(props.todolistId,props.task.id))
        // props.removeTask(props.todolistId, props.task.id);
    }, [props.removeTask, props.todolistId, props.task.id]);

    return (
        <div className={classes.task} key={props.task.id}>
            <Checkbox color={"primary"} checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler} />

            <EditableSpan title={props.task.title} onChange={onChangeTaskTitle} />

            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
});
