import React, { useCallback, useEffect } from "react";
import "./App.css";
import Todolist from "./Todolist";
import AddItemForm from "./Components/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, fetchTodolistTC,
  FilterButtonType,
  removeTodolistAC,
  TodolistDomainType
} from "./State/todolists-reducer";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
} from "./State/tasks-reducer";
import {  useSelector } from "react-redux";
import { AppStateType } from "./State/store";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import { useAppDispatch } from "./State/hooks";

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithRedux() {
    useEffect(() => {
      dispatch(fetchTodolistTC())
    }, []);

    const todolists = useSelector<AppStateType, Array<TodolistDomainType>>(
        (state) => state.todolists,
    );
    const dispatch = useAppDispatch();

    const changeFilter = useCallback(
        (value: FilterButtonType, todolistId: string) => {
            let action = changeTodolistFilterAC(todolistId, value);
            dispatch(action);
        },
        [dispatch],
    );
    const removeTodolist = useCallback(
        (todolistId: string) => {
            let action = removeTodolistAC(todolistId);
            dispatch(action);
        },
        [dispatch],
    );
    const addTodolist = useCallback(
        (title: string) => {
            let action = addTodolistAC(title);
            dispatch(action);
        },
        [dispatch],
    );
    const changeTodolistTitle = useCallback(
        (todolistId: string, newTitle: string) => {
            let action = changeTodolistTitleAC(todolistId, newTitle);
            dispatch(action);
        },
        [dispatch],
    );

    const tasks = useSelector<AppStateType, TasksStateType>((state) => state.tasks);

    const changeTaskStatus = useCallback(
        (todolistId: string, taskId: string, status: TaskStatuses) => {
            let action = changeTaskStatusAC(taskId, status, todolistId);
            dispatch(action);
        },
        [dispatch],
    );
    const removeTask = useCallback(
        (todolistId: string, taskId: string) => {
            let action = removeTasksAC(taskId, todolistId);
            dispatch(action);
        },
        [dispatch],
    );

    const changeTitleTask = useCallback(
        (todolistId: string, taskId: string, newTitle: string) => {
            let action = changeTaskTitleAC(taskId, newTitle, todolistId);
            dispatch(action);
        },
        [dispatch],
    );

    return (
        <div className="App">
            <AppBar position="static" color={"primary"} style={{ backgroundColor: "DimGrey" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm callback={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        return (
                            <Grid item>
                                <Paper elevation={3} style={{ padding: "10px" }}>
                                    <Todolist
                                        key={todolist.id}
                                        id={todolist.id}
                                        title={todolist.title}
                                        tasks={tasks[todolist.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeStatus={changeTaskStatus}
                                        filter={todolist.filter}
                                        removeTodolist={removeTodolist}
                                        changeTitleTask={changeTitleTask}
                                        onChangeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
