import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "../Todolist.module.css";

type AddItemFormType = {
    callback:(title: string)=>void

}


const AddItemForm = (props:AddItemFormType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(event.currentTarget.value);
    };

    const onClickAddTask = () => {
        if (title.trim() !== "") {
            props.callback(title.trim());
            setTitle("");
        } else {
            setError("Title is required!");
        }
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onClickAddTask();
        }
    };
    return (
        <div>
            <input
                className={error ? classes.error : ""}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressHandler}
            />

            <button onClick={onClickAddTask}>+</button>
            {error && <div className={error ? classes.errorMessage : ""}>{error}</div>}
        </div>
    );
};

export default AddItemForm;