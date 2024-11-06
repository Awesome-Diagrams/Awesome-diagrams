import { G, Shape } from "@svgdotjs/svg.js";
import { Draggable } from "./Draggable";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"
import { Movable } from "../movable/Movable";

export class GeneralDraggable implements Draggable {
    init(shape: Shape | G, movable: Movable) {
        new DragHandler(shape).init(true);

        const onDrag = (e: Event): void => {
            const { box } = (e as any).detail
            let { x, y } = box;

            e.preventDefault();

            movable.move(x, y, box.x2, box.y2);
        }

        shape.on('dragmove.namespace', onDrag);
    }
}