import { Box, Line } from "@svgdotjs/svg.js";
import { DraggableType } from "~/model/elem/draggable/DraggableType";
import { MovableType } from "~/model/elem/movable/MovableType";

export type DiagramSerialized = {
    height: number;
    width: number;
    elems: ElemSerialized[];
    connectors: ConnectorSerialized[];
}

export type ElemSerialized = {
    draggable: DraggableType;
    shape: string;
    textElement: string;
    rect: string;
    movable: MovableType;
    isSelected: boolean;
    constraint: Box;
    shapeId : string;
}

export type ConnectorSerialized = {
    id1: string,
    id2: string
}

