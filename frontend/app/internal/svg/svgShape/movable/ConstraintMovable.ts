import { Box, G, Shape } from "@svgdotjs/svg.js";
import { Movable } from "./Movable";

export class ConstraintMovable implements Movable {
    private shape: Shape | G;
    private constraint: Box;

    constructor(shape: Shape | G, constraint: Box, selRectGapSize : number = 0) {
        this.shape = shape;

        this.constraint = new Box({
            x: constraint.x - selRectGapSize / 2,
            y: constraint.y - selRectGapSize / 2,
            width: constraint.width + selRectGapSize,
            height: constraint.height + selRectGapSize
        });
    }

    public move(x: number, y: number, x2?: number, y2?: number) {

        const box = this.shape.bbox();

        x = Math.max(this.constraint.x, Math.min(x, this.constraint.x2 - box.w));
        y = Math.max(this.constraint.y, Math.min(y, this.constraint.y2 - box.h));

        this.shape.move(x, y);
    }
}