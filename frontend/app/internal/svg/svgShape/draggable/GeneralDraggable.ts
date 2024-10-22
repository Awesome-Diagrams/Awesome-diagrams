import { Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"

export class GeneralDraggable implements Draggable {
    public onDrag = (_: Event): void => {}

    init = (shape: Shape): void => {
        new DragHandler(shape).init(true);
    }
}