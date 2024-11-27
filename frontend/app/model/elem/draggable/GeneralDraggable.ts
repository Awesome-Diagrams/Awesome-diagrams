import { G, Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"
import { Movable } from "../movable/Movable";
import { Elem } from "../Elem";

export class GeneralDraggable implements Draggable {
    private isDraggable: boolean = false;

    init(elem: Elem) {
        new DragHandler(elem.getShape()).init(true);

        const onDrag = (e: Event): void => {
            e.preventDefault();
            if (!this.isDraggable) return;

            const { box } = (e as any).detail;
            const { x, y } = box;

            elem.move(x, y);
        }

        elem.getShape().on('dragmove.namespace', onDrag);
    }

    public setDraggable(isDraggable : boolean) {
        this.isDraggable = isDraggable;
    }
}