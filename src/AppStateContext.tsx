// state context for app
import React, { createContext, useReducer, useContext } from "react";

// util
import { v4 as uuidv4 } from "uuid";

import { findItemIndexById } from "./utils/findItemIndexById";
import { DragItem } from "./DragItem";
import { moveItem } from "./moveItem";
import { stat } from "fs";

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
        payload: { 
            text: string 
            taskId: string 
        } 
    }
| 
    {
        // used for moving functionality
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
|
    {
        type: "MOVE_TASK"
        payload: {
            dragIndex: number
            hoverIndex: number
            sourceColumn: string
            targetColumn: string
        }
    }
|
    {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
);

// set context
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

// Task / List for data types
// Column / Card for UI components

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

const appStateReducer = ( state: AppState, action: Action ): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            // reducer logic here
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
            )
            // push new task object to list with that index
            state.lists[targetLaneIndex].tasks.push({
                id: uuidv4(),
                text: action.payload.text
            })
            // return nw object from old state using spread syntax
            return {
                ...state
            };
        };
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload;
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {
                ...state
            };
        };
        case "SET_DRAGGED_ITEM": {
            // set draggedItem field to whatever is passed in from payload
            return { 
                ...state,
                draggedItem: action.payload
            };
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

export interface AppState {
    lists: List[]
};

// export state
export const useAppState = () => {
    return useContext(AppStateContext)
};

// export provider
export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [ state, dispatch ] = useReducer(appStateReducer, appData);
    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            { children }
        </AppStateContext.Provider>
    );
};