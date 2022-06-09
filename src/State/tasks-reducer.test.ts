import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTasksAC,
    tasksReducer,
} from "./tasks-reducer";
import { TasksStateType } from "../AppWithRedux";
import { addTodolistAC } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses } from "../api/todolist-api";

let startState: TasksStateType = {};
beforeEach(()=>{
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", },
            { id: "2", title: "JS", status: TaskStatuses.Completed,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", },
            { id: "2", title: "milk", status: TaskStatuses.Completed,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", }
        ]
    };
})

test.skip('correct task should be deleted from correct array', () => {

    const action = removeTasksAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", },
            { id: "2", title: "JS", status: true },
            { id: "3", title: "React", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", },
            { id: "3", title: "tea", status: TaskStatuses.New,description: "",
                todoListId: "todolistId1",
                order: 0,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                addedDate: "", }
        ]
    });

});


test.skip('correct task should be added to correct array', () => {

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"].length).toBe(3);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC("2", 'false', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('false');
    expect(endState["todolistId2"].length).toBe(3);
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

