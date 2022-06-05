import React from "react";
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
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./State/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
} from "./State/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "./State/store";

export type FilterButtonType = "all" | "active" | "completed";

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

function AppWithRedux() {
    const todolists = useSelector<AppStateType, Array<TodolistType>>((state) => state.todolists);
    const dispatch = useDispatch();

    const changeFilter = (value: FilterButtonType, todolistId: string) => {
        let action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    };
    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId);
        dispatch(action);
    };
    const addTodolist = (title: string) => {
        let action = addTodolistAC(title);
        dispatch(action);
    };
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        let action = changeTodolistTitleAC(todolistId, newTitle);
        dispatch(action);
    };

    const tasks = useSelector<AppStateType, TasksStateType>((state) => state.tasks);

    const changeTaskStatus = (todolistId: string, taskId: string, checked: boolean) => {
        let action = changeTaskStatusAC(taskId, checked, todolistId);
        dispatch(action);
    };
    const removeTask = (todolistId: string, taskId: string) => {
        let action = removeTasksAC(taskId, todolistId);
        dispatch(action);
    };
    const addTask = (todolistId: string, newTitle: string) => {
        let action = addTaskAC(newTitle, todolistId);
        dispatch(action);
    };
    const changeTitleTask = (todolistId: string, taskId: string, newTitle: string) => {
        let action = changeTaskTitleAC(taskId, newTitle, todolistId);
        dispatch(action);
    };

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
                        let filterTasks = tasks[todolist.id];

                        if (todolist.filter === "active") {
                            filterTasks = filterTasks.filter((el) => !el.isDone);
                        }
                        if (todolist.filter === "completed") {
                            filterTasks = filterTasks.filter((el) => el.isDone);
                        }

                        return (
                            <Grid item>
                                <Paper elevation={3} style={{ padding: "10px" }}>
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
