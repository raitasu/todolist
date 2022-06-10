import { FilterButtonType, TodolistDomainType, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodolistDomainType> = [];
beforeEach(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ];
});

test.skip("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, {
        type: "REMOVE-TODOLIST",
        payload: { todolistId: todolistId1 },
    });

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test.skip("correct todolist should be added", () => {
    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistTitle: newTodolistTitle,
            todolistId: ''

        },
    });

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});
test.skip("correct todolist should change its name", () => {
    let newTodolistTitle = "New Todolist";



    const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-TITLE",
        payload: {
            todolistId: todolistId2,
            newTodolistTitle: newTodolistTitle,
        },});

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test.skip("correct filter of todolist should be changed", () => {
    let newFilter: FilterButtonType = "completed";


    const endState = todolistsReducer(startState, {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            todolistId: todolistId2,
            filterValue: newFilter,
        },
    });

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
