// main app
import React from "react";
import {useAppState} from "./state/AppStateContext";
import {addTask} from "./state/actions";
import {CustomDragLayer} from "./CustomDragLayer";

// components
import {AddNewItem} from "./AddNewItem";
import {AppContainer} from "./styles";
import {addList} from "./state/actions";
import {Column} from "./Column";

export const App = () => {
    const {lists, dispatch} = useAppState();

    return (
        <AppContainer>
            <CustomDragLayer />
                {
                    lists.map((list) => (
                        <Column
                            text={list.text}
                            key={list.id}
                            id={list.id}
                        />
                    ))
                }
                <AddNewItem
                    toggleButtonText="+ Add another list"
                    onAdd={text => dispatch(addList(text))}
                />
        </AppContainer>
    );
}
