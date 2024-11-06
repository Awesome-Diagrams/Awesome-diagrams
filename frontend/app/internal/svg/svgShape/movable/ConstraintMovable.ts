import { Box, Shape } from "@svgdotjs/svg.js";
import { Movable } from "./Movable";

export class ConstraintMovable implements Movable {
    private shape: Shape;
    private constraint: Box;

    constructor(shape: Shape, constraint: Box) {
        this.shape = shape;
        this.constraint = constraint;
    }

    public move(x: number, y: number, x2?: number, y2?: number) {

        const box = this.shape.bbox();

        if (x < this.constraint.x) {
            x = this.constraint.x;
        }
        
        if (y < this.constraint.y) {
            y = this.constraint.y;
        }

        if (x2 && x2 > this.constraint.x2) {
            x = this.constraint.x2 - box.w;
        }
        
        if (y2 && y2 > this.constraint.y2) {
            y = this.constraint.y2 - box.h;
        }

        this.shape.move(x, y);
    }
}