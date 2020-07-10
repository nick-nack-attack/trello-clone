// card component
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
// state
import { useAppState } from "./AppStateContext";
//styling
import { CardContainer } from "./styles";
//utils
import { DragItem } from "./utils/DragItem";
import { useItemDrag } from './utils/useItemDrag';

// set type of props
interface CardProps {
    text: string
    index: number
    id: string // here?
    columnId: string
};

// define CardProps interface for the props
export const Card = ({ text, index, id, columnId }: CardProps) => {

    console.log(`column id is`, columnId);

    const { state, dispatch } = useAppState();
    const ref = useRef<HTMLDivElement>(null);
    const { drag } = useItemDrag({ type: "CARD", id, index, text, columnId });

    
    const [, drop] = useDrop({
        accept: "CARD",
        hover(item: DragItem) {
            if (item.id === id) {
                return
            };
            const dragIndex = item.index;
            const hoverIndex = index;
            const sourceColumn = id;
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
            item.id = targetColumn
        }
    });

    drag(drop(ref));
    

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