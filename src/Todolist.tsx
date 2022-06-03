import { FilterButtonType, TaskType } from "./App";
import "./App.css";
import classes from "./Todolist.module.css";
import AddItemForm from "./Components/AddItemForm";

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
};

const Todolist = (props: PropsType) => {
    const onChangeStatusHandler = (todolistId: string, newId: string, value: boolean) => {
        props.changeStatus(todolistId, newId, value);
    };

    const methodMap = props.filterTasks.map((task) => {
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
                <span>{task.title}</span>
            </li>
        );
    });

    const onClickHandler = (value: FilterButtonType) => {
        props.changeFilter(value, props.id);
    };
    const addTask = (title:string) => {
        props.addTask(props.id, title);
    };
    return (
        <div>
            <div className={classes.todolistTitle}>
                <div>
                    <h1>{props.title}</h1>
                </div>
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
