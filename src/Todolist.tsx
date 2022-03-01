import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterButtonType} from "./App";
import './App.css'
import classes from './Todolist.module.css'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterButtonType) => void
    addTask: (newTitle: string) => void
    changeStatus: (checked: boolean, id: string) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string|null>(null )

    const onChangeStatusHandler = (event: boolean, newId: string) => {
        props.changeStatus(event, newId)
    }

    const methodMap = props.tasks.map((task) => {

        return (<li key={task.id}>
            <button onClick={() => {
                props.removeTask(task.id)
            }}>Delete
            </button>
            <input type={"checkbox"} checked={task.isDone}
                   onChange={(event) => onChangeStatusHandler(event.currentTarget.checked, task.id)}/><span>{task.title}</span>
        </li>)
    })

    const onClickHandler = (value: FilterButtonType) => {
        props.changeFilter(value)
    }

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const onClickAddTask = () => {
        if (title.trim() !== '') {

            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }

    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddTask()
        }
    }

    return (
        <div>
            <div><h1>{props.title}</h1></div>
            <div><input className={error ? classes.error : ''} value={title} onChange={onChangeTitle}
                        onKeyPress={onKeyPressHandler}/>

                <button onClick={onClickAddTask}>Add languages</button>
                {error && <div className={ error ? classes.errorMessage : ''}>{error}</div>}
            </div>
            <div>
                <ul>
                    {methodMap}
                </ul>
            </div>
            <div>
                <button className={'active_item'} onClick={() => {
                    onClickHandler('All')
                }}>All
                </button>
                <button className={'active_item'} onClick={() => {
                    onClickHandler('Active')
                }}>Active
                </button>
                <button className={'active_item'} onClick={() => {
                    onClickHandler('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}
export default Todolist;
