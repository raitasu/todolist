import React, {ChangeEvent, useState} from "react";

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
        <input
            value={title}
            onChange={onChangeHandler}
            type="text"
            onBlur={activateViewHandler}
            autoFocus
        />
    ) : (
        <span onDoubleClick={editModeHandler}>{props.title}</span>
    );
};

export default EditableSpan;
