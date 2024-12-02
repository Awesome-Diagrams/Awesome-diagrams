import { Shape } from "@svgdotjs/svg.js";
import { Movable } from "../movable/Movable";
import { Elem } from "../Elem";
import { DraggableType } from "./DraggableType";

export interface Draggable {
    init(elem: Elem): void;

    setDraggable(isDraggable: boolean): void;

    getType(): DraggableType;
}