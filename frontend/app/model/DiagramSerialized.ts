import { Box } from "@svgdotjs/svg.js";
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
    shape: ShapeSerialized;
    textElement: TextSerialized;
    rect: InvisRectSerialized;
    movable: MovableType;
    constraint: Box;
    shapeId : string;
}

export type ShapeSerialized = {
    type: string;
    x: number;
    y: number;
    cx: number;
    cy: number;
    height?: number;
    width?: number;
    rx?: number;
    ry?: number;
    r?: number;
}

export type TextSerialized = {
    color: string;
    fontSize: number;
    text: string;
}

export type InvisRectSerialized = {
    width: number;
    height: number;
}

export type ConnectorSerialized = {
    id1: string,
    id2: string
}

