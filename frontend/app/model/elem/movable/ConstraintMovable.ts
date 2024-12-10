import { Box, G } from "@svgdotjs/svg.js";
import { Movable } from "./Movable";
import { MovableType } from "./MovableType";

export class ConstraintMovable implements Movable {
    private group: G;
    private constraint: Box;

    constructor(group: G, constraint: Box, selRectGapSize : number = 0) {
        this.group = group;

        this.constraint = new Box({
            x: constraint.x - selRectGapSize / 2,
            y: constraint.y - selRectGapSize / 2,
            width: constraint.width + selRectGapSize,
            height: constraint.height + selRectGapSize
        });
    }

    public move(x: number, y: number) {

        const box = this.group.bbox();

        x = Math.max(this.constraint.x, Math.min(x, this.constraint.x2 - box.w));
        y = Math.max(this.constraint.y, Math.min(y, this.constraint.y2 - box.h));

        this.group.move(x, y);
    }

    public getType(): MovableType {
        return 'CONSTRAINT'
    }
}