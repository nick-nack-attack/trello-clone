// component for columns
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
// components
import { AddNewItem } from "./AddNewItem";
import { Card } from './Card';
import { DragItem } from './utils/DragItem';
import { useItemDrag } from './utils/useItemDrag';
// hooks
import { useAppState } from "./AppStateContext";
import { isHidden } from './utils/isHidden';
// import styles
import { ColumnContainer, ColumnTitle } from "./styles";

//

interface ColumnProps {
    // define props as interface
    // ? makes it an optional so text can be undefined for ex
    // pass in column title (text)
    text: string
    index: number
    id: string
    isPreview?: boolean // isPreview: Function
};

export const Column = ({ 
    text, 
    index, 
    id,
    isPreview 
    }: ColumnProps) => {

        // call useAppState to gt the data
        const { state, dispatch } = useAppState();
        // manually provide type for useRef call
        // provide as ref prop to Column Container
        const ref = useRef<HTMLDivElement>(null);
        const { drag } = useItemDrag({ type: "COLUMN", id, index, text });

        /*
        const [, drop] = useDrop({
            // pass accepted item type
            accept: ["COLUMN", "CARD"],
            // hover callback triggered when you 
            // move dragged item above the drop target
            hover(item: DragItem) {

                if (item.type === "COLUMN") {
                    const dragIndex = item.index;
                    const hoverIndex = id;
                    // check if not the same which means
                    // we are not hovering above the dragged item
                    if (dragIndex === hoverIndex) {
                        return
                    };
                    dispatch({
                        type: "MOVE_LIST",
                        payload: {
                            dragIndex,
                            hoverIndex
                        }
                    })
                    item.index = hoverIndex;
                } else {
                    const dragIndex = item.index;
                    const hoverIndex = 0;
                    const sourceColumn = item.columnId;
                    const targetColumn = item.id;
                    if (sourceColumn === targetColumn) {
                        return
                    }
                    dispatch({
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

        drag(drop(ref))
        */
    return (

        <ColumnContainer 
            // specify a drag target
            isPreview={ isPreview }
            ref={ ref } 
            // isHidden={ isHidden(isPreview, state.draggedItem, "COLUMN", id) }
        >

            <ColumnTitle>
                { text }
            </ColumnTitle>

                { /* get column by index */ }
                { state.lists[index].tasks.map((task, i) => (
                    <Card 
                        text={ task.text }
                        key={ task.id }
                        index={ i }
                        id={ task.id }
                    />
                ))}

                <AddNewItem
                    toggleButtonText="+ Add another card"
                    onAdd={ text => dispatch({
                        type: "ADD_TASK",
                        payload: {
                            text,
                            // this is task id as its a task being added
                            taskId: id
                        }
                    })}
                    dark
                />
        </ColumnContainer>
    )
};