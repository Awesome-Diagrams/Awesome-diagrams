import { Box } from "@svgdotjs/svg.js";
import { DraggableType } from "~/model/elem/draggable/DraggableType";
import { MovableType } from "~/model/elem/movable/MovableType";
import { ConnectorType } from "./elem/ConnectorType";
import { Point } from "./Point";
import { DiagramSchemaType } from "./diagram/DiagramSchemaType";

export type DiagramSerialized = {
    type: string;
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
    customConfig : customsSerialized;
    umlData : UMLClassData;
}

export enum ShapeType {
    Circle = "circle",
    Rect = "rect",
    Ellipse = "ellipse",
    Polyline = "polyline",
    Line = "line",
    Square = "square",
    Combined = "combined",
    UMLClass = 'uml_class',
    UMLInterface = 'uml_interface',
    UMLActor = 'uml_actor',
    Grouped = 'grouped',
}

export type ShapeSerialized = {
    type: ShapeType;
    x: number;
    y: number;
    cx: number;
    cy: number;
    path?: string;
    height: number;
    width: number;
    rx?: number;
    ry?: number;
    r?: number;
    x2?: number;
    y2?: number;
    group?: string;
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

export type UMLClassData = {
    className: string;
    attributes: string[];
    methods: string[];
}