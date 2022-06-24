import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from "redux";
import { TodolistsActionsType, todolistsReducer } from "./todolists-reducer";
import { TasksActionsType, tasksReducer } from "./tasks-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof store.getState>;
export type AppActionType = TodolistsActionsType | TasksActionsType;
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
// @ts-ignore
window.store = store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>;
