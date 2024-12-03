import { Box, G, Rect, Shape, Text } from "@svgdotjs/svg.js";
import { DraggableType } from "~/model/elem/draggable/DraggableType";
import { MovableType } from "~/model/elem/movable/MovableType";

export type DiagramSerialized = {
    height: number;
    width: number;
    elems: ElemSerialized[]
}

export type ElemSerialized = {
    draggable: DraggableType;
    group: G;
    shape: Shape;
    textElement: Text;
    rect: Rect;
    movable: MovableType;
    isSelected: boolean;
    constraint: Box;
}

