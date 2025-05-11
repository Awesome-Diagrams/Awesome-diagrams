import { G } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable";
import { Elem } from "../Elem";
import { DraggableType } from "./DraggableType";

export class DeltaDraggable implements Draggable {
    private isDraggable: boolean = false;

    constructor(elem: Elem) {
        new DragHandler(elem.getGroup()).init(true);

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

            elem.move(dx, dy);
        };

        elem.getGroup().off('dragmove.namespace');
        elem.getGroup().on('dragmove.namespace', onDrag);

        elem.getGroup().off('dragstart.namespace');
        elem.getGroup().on('dragstart.namespace', (e: any) => {
            lastX = e.detail.box.x;
            lastY = e.detail.box.y;
        });

        elem.getGroup().off('dragend.namespace');
        elem.getGroup().on('dragend.namespace', () => {
            lastX = 0;
            lastY = 0;
        });
    }

    public setDraggable(isDraggable: boolean): Draggable {
        this.isDraggable = isDraggable;

        return this;
    }

    public getType(): DraggableType {
        return 'DELTA';
    }
}
