import { Shape } from "@svgdotjs/svg.js";
import { Movable } from "../movable/Movable";

export interface Draggable {
    init(shape: Shape, movable: Movable): void;

    setDraggable(isDraggable: boolean) : void;
}