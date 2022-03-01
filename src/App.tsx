import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterButtonType = 'All' | 'Active' | 'Completed'

function App() {

    const removeTask = (newID: string) => {
        const deleteTasks = tasks.filter((el) => el.id !== newID)
        setTasks(deleteTasks)
    }

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterButtonType>('All')

    const changeFilter = (value: FilterButtonType) => {
        setFilter(value)
    }

    let filterTasks = tasks

    if (filter === 'Active') {
        filterTasks = tasks.filter((el) => !el.isDone)
    }
    if (filter === 'Completed') {
        filterTasks = tasks.filter((el) => el.isDone)
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeStatus = (checked: boolean, id: string) => {
        console.log(checked)
        setTasks(tasks.map(el=>el.id===id ? {...el, isDone: checked}: el))
    }

    return (
        <div className="App">
            <Todolist title={'Languages'} tasks={filterTasks} removeTask={removeTask} changeFilter={changeFilter}
                      addTask={addTask} changeStatus={changeStatus}/>
        </div>
    );
}

export default App;
