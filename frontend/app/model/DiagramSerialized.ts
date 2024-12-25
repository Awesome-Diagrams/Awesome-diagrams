import { Box } from "@svgdotjs/svg.js";
import { DraggableType } from "~/model/elem/draggable/DraggableType";
import { MovableType } from "~/model/elem/movable/MovableType";
import { ConnectorType } from "./elem/ConnectorType";
import { Point } from "./Point";

export type DiagramSerialized = {
    height: number;
    width: number;
    elems: ElemSerialized[];
    connectors: ConnectorSerialized[];
}

export type ElemSerialized = {
    draggable: DraggableType;
    shape: ShapeSerialized;
    color: string,
    textElement: TextSerialized;
    rect: InvisRectSerialized;
    movable: MovableType;
    constraint: Box;
    shapeId : string;
    customConfig : customsSerialized
}

export enum ShapeType {
    Circle = "circle",
    Rect = "rect",
    Ellipse = "ellipse",
    Polyline = "polyline",
    Square = "square",
}

export type ShapeSerialized = {
    type: ShapeType;
    x: number;
    y: number;
    cx: number;
    cy: number;
    height: number;
    width: number;
    rx?: number;
    ry?: number;
    r?: number;
}

export type customsSerialized = {
    stroke_color: string;
    stroke_width: number;
    stroke_dasharray?: string;
    fill_color: string;
    gradient_enabled: boolean; 
    secondColor: string;
    opacity?: number;
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
    id2: string,
    connectorType: ConnectorType,
    points: Point[],
}

