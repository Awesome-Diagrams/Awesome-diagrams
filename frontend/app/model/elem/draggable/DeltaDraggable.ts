import { G, Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable";
import { Elem } from "../Elem";
import { DraggableType } from "./DraggableType";

export class DeltaDraggable implements Draggable {
    private isDraggable: boolean = false;

    configure(elem: Elem) {
        new DragHandler(elem.getShape()).init(true);

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

            elem.getMovable().move(dx, dy);
        };

        elem.getShape().on('dragmove.namespace', onDrag);

        elem.getShape().on('dragstart.namespace', (e: any) => {
            lastX = e.detail.box.x;
            lastY = e.detail.box.y;
        });

        elem.getShape().on('dragend.namespace', () => {
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
