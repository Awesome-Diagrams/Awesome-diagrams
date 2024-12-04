import { Movable } from "./Movable";
import { UseCaseShape } from "../shapes/UseCaseShape";
import { Box } from "@svgdotjs/svg.js";
import { selectedShapes } from "~/internal/component/tools/SelectionController";

export class MultiMovable implements Movable {
    private constraint: Box;

    constructor(constraint: Box, selRectGapSize : number = 0) {
        this.constraint = constraint;
        this.constraint = new Box({
            x: constraint.x - selRectGapSize / 2,
            y: constraint.y - selRectGapSize / 2,
            width: constraint.width + selRectGapSize,
            height: constraint.height + selRectGapSize
        });
    }

    private calculateBoundingBox() {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        selectedShapes.forEach((shape) => {
            const bbox = shape.group.bbox();
            minX = Math.min(minX, bbox.x);
            minY = Math.min(minY, bbox.y);
            maxX = Math.max(maxX, bbox.x2);
            maxY = Math.max(maxY, bbox.y2);
        });

        return { minX, minY, maxX, maxY };
    }

    public move(dx: number, dy: number, x2?: number, y2?: number): void {
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

        selectedShapes.forEach((shape) => {
            const startX = shape.getX();
            const startY = shape.getY();
            shape.group.move(startX + dx, startY + dy);
        });
    }
}
