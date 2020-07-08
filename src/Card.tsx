// card component
import React from "react";
import { useDrop } from "react-dnd";
//styling
import { CardContainer } from "./styles";
//utils
import { CardDragItem } from "./DragItem";

// set type of props
interface CardProps {
    text: string
    index: number
};

const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
        if (item.id === id) {
            return
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        const sourceColumn = item.columnId;
        const targetColumn = columnId;
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
})
drag(drop(ref));

// define CardProps interface for the props
export const Card = ({ text }: CardProps) => {
    return (
        <CardContainer>
            { text }
        </CardContainer>
    );
};