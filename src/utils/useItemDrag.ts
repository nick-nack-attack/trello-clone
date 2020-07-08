import { useDrag } from "react-dnd";
import { useAppState } from "../AppStateContext";
import { DragItem } from "../DragItem";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export const useItemDrag = (item: DragItem) => {

    const { dispatch } = useAppState();
    const [, drag, preview ] = useDrag({
        // item contains data about to be dragged
        item,
        // called when we start dragging an item
        begin: () => dispatch({
            type: "SET_DRAGGED_ITEM",
            payload: item
        }),
        // called when we release item
        end: () => dispatch({ 
            type: "SET_DRAGGED_ITEM",
            payload: undefined
        })
    })
    useEffect(() => {
        // The preview function accepts an element or node to use as a drag preview. 
        preview(getEmptyImage(), { captureDraggingState: true});
    }, [preview]);
    return { drag }
};