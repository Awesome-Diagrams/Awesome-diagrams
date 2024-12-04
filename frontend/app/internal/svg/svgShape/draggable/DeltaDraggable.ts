import { G, Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable";
import { MultiMovable } from "../movable/MultiMovable";

export class DeltaDraggable implements Draggable {
    private isDraggable: boolean = false;

    init(shape: Shape | G, movable: MultiMovable) {
        new DragHandler(shape).init(true);

        let lastX = 0;
        let lastY = 0;

        const onDrag = (e: Event): void => {
            e.preventDefault();
            if (!this.isDraggable) return;

            const { box } = (e as any).detail;

            const dx = box.x - lastX;
            const dy = box.y - lastY;

            lastX = box.x;
            lastY = box.y;

            movable.move(dx, dy);
        };

        shape.on('dragmove.namespace', onDrag);

        shape.on('dragstart.namespace', (e: any) => {
            lastX = e.detail.box.x;
            lastY = e.detail.box.y;
        });

        shape.on('dragend.namespace', () => {
            lastX = 0;
            lastY = 0;
        });
    }

    public setDraggable(isDraggable: boolean) {
        this.isDraggable = isDraggable;
    }
}
