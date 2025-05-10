import { Movable } from "./Movable";
import { Box, G } from "@svgdotjs/svg.js";
import { selectedShapes } from "~/components/tools/SelectionController";
import { MovableType } from "./MovableType";

export class MultiMovable implements Movable {
    private constraint?: Box;

    constructor(selRectGapSize : number = 0, constraint?: Box) {
        this.constraint = constraint
            ? new Box({
                x: constraint.x - selRectGapSize / 2,
                y: constraint.y - selRectGapSize / 2,
                width: constraint.width + selRectGapSize,
                height: constraint.height + selRectGapSize
            })
            : constraint;
    }

    private calculateBoundingBox() {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        selectedShapes.forEach((shape) => {
            const bbox = shape.getGroup().bbox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x2);
            maxY = Math.max(maxY, bbox.y2);
        });

        return { minX, minY, maxX, maxY };
    }

    public move(dx: number, dy: number): void {

        if (this.constraint) {
            const { minX, minY, maxX, maxY } = this.calculateBoundingBox();

            const newMinX = minX + dx;
            const newMinY = minY + dy;
            const newMaxX = maxX + dx;
            const newMaxY = maxY + dy;

            const withinX = newMinX >= this.constraint.x && newMaxX <= this.constraint.x2;
            const withinY = newMinY >= this.constraint.y && newMaxY <= this.constraint.y2;

            if (!withinX || !withinY) {
                return;
            }
        }

        selectedShapes.forEach((shape) => {
            const startX = shape.getX();
            const startY = shape.getY();
            shape.getGroup().move(startX + dx, startY + dy);
            //shape.trigger("move", shape.getGroup().cx(), shape.getGroup().cy());
        });
    }

    public getType(): MovableType {
        return 'MULTI';
    }
}
