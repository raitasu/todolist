import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string;
    onChange:(newTitle:string)=>void
};

const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    const editModeHandler = () => {
        setEditMode(true);
    };
    const activateViewHandler = () => {
        setEditMode(false);
        props.onChange(title)
    };
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode ? (
        <TextField variant={'outlined'}
            value={title}
            onChange={onChangeHandler}
            type="text"
            onBlur={activateViewHandler}
            autoFocus
                   size={'small'}
        />
    ) : (
        <span onDoubleClick={editModeHandler}>{props.title}</span>
    );
};

export default EditableSpan;
