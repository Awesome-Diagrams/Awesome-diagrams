import { Shape } from "@svgdotjs/svg.js";


export interface Movable {
    move(x: number, y: number): void;
}