import React from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import { CustomDragLayerContainer } from './styles';
import { Column } from './Column';

// manually set return value of func to be React.CSSProperties
// not required but useful for handling errors

// func accepts currentOffset arg that has coordinats
// contains currently dragged item position
function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {

    if (!currentOffset) {
        return {
            display: "none"
        };
    };

    // take x y fields from currentOffset
    // then generate value for CSS transform prop
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebkitTransform: transform
    };
};

export const CustomDragLayer: React.FC = () => {
    // use useDragLayer to obtain isDragging flag and currently dragged item object.
    const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    }))
  
    // if dragging, render layout
    return isDragging ? (
      <CustomDragLayerContainer>
        <div style={ getItemStyles(currentOffset) }>
            <Column
                id={ item.id }
                text={ item.text }
                index={ item.index }
                isPreview={ item.isPreview }
            />
        </div>
      </CustomDragLayerContainer>
    ) : null;
  };