export type CardDragItem = {
    id: string;
    text: string;
    type: "COLUMN";
}

export type ColumnDragItem = {
    id: string;
    text: string;
    type: "COLUMN";
};

export type DragItem = ColumnDragItem | CardDragItem;
