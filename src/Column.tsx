// component for columns
import React from "react";
import { useAppState } from "./state/AppStateContext";
import { addTask } from "./state/actions";

// components
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";


// import styles
import { ColumnContainer, ColumnTitle } from "./styles";

type ColumnProps = {
    text: string;
    id: string;
}

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksByListId, dispatch } = useAppState();
    const tasks = getTasksByListId(id);

    return (
        <ColumnContainer>
            <ColumnTitle>
                { text }
            </ColumnTitle>
            {
                tasks.map((task) => (
                    <Card
                        id={task.id}
                        key={task.id}
                        text={task.text}
                    />
                ))
            }
            <AddNewItem
                toggleButtonText="+ Add another task"
                onAdd={ text => dispatch(addTask(text, id)) }
                dark
            />
        </ColumnContainer>
    )
};
