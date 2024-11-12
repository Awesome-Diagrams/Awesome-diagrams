import { G, Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"
import { Movable } from "../movable/Movable";

export class GeneralDraggable implements Draggable {
    private isDraggable: boolean = false;

    init(shape: Shape | G, movable: Movable) {
        new DragHandler(shape).init(true);

        const onDrag = (e: Event): void => {
            e.preventDefault();
            if (!this.isDraggable) return;

            const { box } = (e as any).detail;
            let { x, y } = box;

            movable.move(x, y, box.x2, box.y2);
        }

        shape.on('dragmove.namespace', onDrag);
    }

    public setDraggable(isDraggable : boolean) {
        this.isDraggable = isDraggable;
    }
}