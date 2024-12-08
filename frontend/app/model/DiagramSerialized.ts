import { Box } from "@svgdotjs/svg.js";
import { DraggableType } from "~/model/elem/draggable/DraggableType";
import { MovableType } from "~/model/elem/movable/MovableType";

export type DiagramSerialized = {
    height: number;
    width: number;
    elems: ElemSerialized[]
}

export type ElemSerialized = {
    draggable: DraggableType;
    shape: string;
    textElement: string;
    rect: string;
    movable: MovableType;
    isSelected: boolean;
    constraint: Box;
}

