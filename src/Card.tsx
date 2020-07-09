// card component
import React from "react";
import { useDrop } from "react-dnd";
// state
import { useAppState } from "./AppStateContext";
//styling
import { CardContainer } from "./styles";
//utils
import { DragItem as CardDragItem } from "./utils/DragItem";

// set type of props
interface CardProps {
    text: string
    index: number
    id: string // here?
};

// define CardProps interface for the props
export const Card = ({ text, index, id }: CardProps) => {

    const { state, dispatch } = useAppState();

    /*
    const [, drop] = useDrop({
        accept: "CARD",
        hover(item: CardDragItem) {
            // Where is this coming from? The id?
            // should be passed in ... i have to check
            const id = "1";
            if (item.id === id) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index
            const sourceColumn = item.columnId;
            const targetColumn = columnId;
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
    });

    drag(drop(ref));
    */

    return (
        <CardContainer>
            { text }
        </CardContainer>
    );
};