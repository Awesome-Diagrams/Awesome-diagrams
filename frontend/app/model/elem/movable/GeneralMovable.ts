import { Shape } from "@svgdotjs/svg.js";
import { Movable } from "./Movable";

export class GeneralMovable implements Movable {
    private shape: Shape;

    constructor(shape: Shape) {
        this.shape = shape;
    }

    public move(x: number, y: number) {
        this.shape.move(x, y);
    }
}