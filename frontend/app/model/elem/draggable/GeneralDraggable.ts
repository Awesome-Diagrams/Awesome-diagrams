import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"
import { Elem } from "../Elem";
import { DraggableType } from "./DraggableType";

export class GeneralDraggable implements Draggable {
    private isDraggable: boolean = false;

    configure(elem: Elem) {
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

    public setDraggable(isDraggable : boolean): Draggable {
        this.isDraggable = isDraggable;

        return this
    }

    public getType(): DraggableType {
        return 'GENERAL'
    }
}