import { FilterButtonType, TodolistDomainType, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: Array<TodolistDomainType> = [];
beforeEach(() => {
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ];
});

test.skip("correct todolist should be removed", () => {            //@ts-ignore

    const endState = todolistsReducer(startState, { type: "REMOVE-TODOLIST", id: todolistId1 });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test.skip("correct todolist should be added", () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        payload: {
            //@ts-ignore
            title: newTodolistTitle,
        }

    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test.skip("correct todolist should change its name", () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistId2,
        title: newTodolistTitle,
    };
    //@ts-ignore

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test.skip("correct filter of todolist should be changed", () => {

    let newFilter: FilterButtonType = "completed";

    const action = {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistId2,
        filter: newFilter,
    };
    //@ts-ignore

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});






