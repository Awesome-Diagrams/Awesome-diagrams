import { G, Rect } from "@svgdotjs/svg.js";

export type DiagramSerialized = {
    height: number;
    width: number;
    shapes: ShapeSerialized[]
}

export type ShapeSerialized = {
    draggable?: DraggableType;
    group: G;
    svgShapeSerialized: string;
    textElement: Text;
    svgRectSerialized: Rect;
    movable: MovableType;
    isSelected: boolean;
    selectionOutline?: Rect; 
}

export type MovableType = "NONE" | "GENERAL" | "CONSTRAINT"

export type DraggableType = "NONE" | "GENERAL"
