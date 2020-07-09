// calc if we need to hide the column
import { DragItem } from './DragItem';

// func compares type and id of currently dragged item
// with type and id we pass to it
export const isHidden = (
    isPreview: boolean | undefined,
    draggedItem: DragItem | undefined,
    itemType: string,
    id: string
): boolean => {
    return Boolean(
        !isPreview
        && draggedItem 
        && draggedItem.type === itemType
        && draggedItem.id === id
    );
};