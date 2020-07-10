// state context for app
import React, { createContext, useReducer, useContext } from "react";
// utils
import { v4 as uuidv4 } from "uuid";
import { findItemIndexById } from "./utils/findItemIndexById";
// hooks
import { DragItem } from "./utils/DragItem";
import { moveItem } from "./utils/moveItem";

//

interface Task {
    id: string
    text: string
};

interface List {
    id: string
    text: string
    tasks: Task[]
};

interface AppStateContextProps {
    state: AppState
    dispatch: Function
};

export interface AppState {
    lists: List[],
    draggedItem?: any;
};

// using discriminated union
type Action = (
| 
    {
        // for adding a new list functionality
        type: "ADD_LIST"
        payload: string
    } 
| 
    {
        // for adding a new task functionality
        type: "ADD_TASK"
        payload: { text: string; taskId: string } 
    }
| 
    {
        // used for moving functionality
        type: "MOVE_LIST"
        // start dragging column, remember original position and pass it as dragIndex
        // when we hover other columns, take their positions and pass it as hoverIndex
        payload: { dragIndex: number; hoverIndex: number }
    }
|
    {
        type: "MOVE_TASK"
        payload: { 
            dragIndex: number; 
            hoverIndex: number; 
            sourceColumn: string; 
            targetColumn: string;
        }
    }
|
    {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
);

// set context
const AppStateContext = (
    // pass empty object to cast to ASCP to createConext func
    createContext<AppStateContextProps>(
        {} as AppStateContextProps
    )
);

// Task / List for data types
// Column / Card for UI components

// data object has AppState type
const appData: AppState = {
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{
                id: "c0",
                text: "Generate app scaffold"
            }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{
                id: "c2",
                text: "Learn Typescript"
            }]
        },
        {
            id: "2",
            text: "Done",
            tasks: [{
                id: "c3",
                text: "Begin to use static typing"
            }]
        }
    ]
};

// useReducer is hook that allows us to manage complex state
// ex. including objects with multipule fields
const appStateReducer = ( state: AppState, action: Action ): AppState => {
    // don't need to define const for action types
    // TS throws error at attempt to compare action.type 
    // to something its not
    switch (action.type) {
        // curly brackets for block scope
        // so now visible across whole switch block
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    {
                        id: uuidv4(),
                        text: action.payload,
                        tasks: []
                    }
                ]
            };
        };
        case "ADD_TASK": {
            // first find list index and save to const
            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            );
            // push new task object to list with that index
            state.lists[targetLaneIndex].tasks.push({
                id: uuidv4(),
                text: action.payload.text
            });
            // return nw object from old state using spread syntax
            return {
                ...state
            };
        };
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload;
            // calc new value for lists array
            // moveItem takes the source array and two indices that it will swap
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {
                ...state
            };
        };
        case "SET_DRAGGED_ITEM": {
            // set draggedItem field to whatever is passed in from payload
            return { ...state, draggedItem: action.payload };
        };
        case "MOVE_TASK": {
            const {
                dragIndex,
                hoverIndex,
                sourceColumn,
                targetColumn
            } = action.payload;
            const sourceLaneIndex = findItemIndexById(state.lists, sourceColumn);
            const targetLaneIndex = findItemIndexById(state.lists, targetColumn);
            const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0];
            state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
            return {
                ...state
            }
        }
        default: {
            return state
        };
    };
};

export const useAppState = () => {
    // retrieve value from AppStateContext using useContext
    // then return the result
    return useContext(AppStateContext)
};

// only accepts children as prop
// R.PWC requires one generic arg, but pass empty object
// bc we dont want any other props
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    // Reducer is func that calculates new state
    // by combining old state with an action object
    // Dispatch is method usd to send actions to reducer
    const [ state, dispatch ] = useReducer(appStateReducer, appData);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            { children }
        </AppStateContext.Provider>
    );

};