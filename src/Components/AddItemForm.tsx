import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    callback: (title: string) => void;
};

const AddItemForm = (props: AddItemFormType) => {
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
            <TextField
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressHandler}
                size={"small"}
                label={'Title'}
                helperText={error}
            />

            <IconButton
                color={"primary"}
                style={{ maxWidth: "40px", maxHeight: "40px", minWidth: "40px", minHeight: "40px" }}
                onClick={onClickAddTask}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;
