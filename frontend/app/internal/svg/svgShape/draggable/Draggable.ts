import { Shape } from "@svgdotjs/svg.js";

export interface Draggable {
    onDrag(ev: Event): void;
    init(shape: Shape): void;
}