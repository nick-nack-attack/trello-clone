// component for columns
import React, { useRef } from "react";
import { useDrop } from "react-dnd";

// components
import { AddNewItem } from "./AddNewItem";
import { Card } from './Card';
import { DragItem } from './DragItem';
import { useItemDrag } from './utils/useItemDrag';

// context
import { useAppState } from "./AppStateContext";

// import styles
import { ColumnContainer, ColumnTitle } from "./styles";

const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {

        if (item.type === "COLUMN") {
            
            dispatchEvent({
                type: "MOVE_LIST",
                payload: {
                    dragIndex,
                    hoverIndex
                }
            })

        } else {
            const dragIndex = item.index;
            const hoverIndex = 0;
            const sourceColumn = item.columnId;
            const targetColumn = id;

            if (dragIndex === hoverIndex) {
                return
            };

            if (sourceColumn === targetColumn) {
                return
            };

            dispatchEvent({
                type: "MOVE_TASK",
                payload: {
                    dragIndex,
                    hoverIndex,
                    sourceColumn,
                    targetColumn
                }
            })
            item.index = hoverIndex;
            item.columnId = targetColumn;
            
        }
    }
})

// pass in column title (text)
// define props as interface
// ? makes it an optional so text can be undefined for ex
interface ColumnProps {
    text: string
    index: number
    id: string
    isPreview: Function
};

export const Column = ({ 
    text, 
    index, 
    id,
    isPreview 
    }: ColumnProps) => {

        const { state, dispatch } = useAppState();
        // manually provide type for useRef call
        // provide as ref prop to Column Container
        const ref = useRef<HTMLDivElement>(null);
        const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

        drag(drop(ref));

    return (
        <ColumnContainer 
            isPreview={ isPreview }
            ref={ ref } 
            isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
        >
            <ColumnTitle>
                { text }
            </ColumnTitle>
                { state.lists[index].tasks.map((task, i) => (
                    <Card 
                        text={task.text}
                        key={task.id}
                        index={ i }
                    />
                )) }
                <AddNewItem
                    toggleButtonText="+ Add another task"
                    onAdd={ text => dispatch({
                        type: "ADD_TASK",
                        payload: {
                            text,
                            columnId: id
                        }
                    }) }
                    dark
                />
        </ColumnContainer>
    )
};