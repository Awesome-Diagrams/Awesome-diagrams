import { Box, Shape , Svg } from "@svgdotjs/svg.js";
import { SvgShape } from "./svgShape";
import { DragHandler } from "~/internal/svg/svgDraggable/svg.draggable"

export class SvgShapeDraggable extends SvgShape{
    constructor(shape: Shape, svg: Svg, constraint?: Box) {
        super(shape, svg);

        new DragHandler(shape).init(true)
        if (!constraint) {
            return;
        }

        shape.on('dragmove.namespace', (e: Event) => {
            const { handler, box } = (e as any).detail
            e.preventDefault();
          
            let { x, y } = box;

            if (x < constraint.x) {
              x = constraint.x;
            }
          
            if (y < constraint.y) {
              y = constraint.y;
            }
          
            if (box.x2 > constraint.x2) {
              x = constraint.x2 - box.w;
            }
          
            if (box.y2 > constraint.y2) {
              y = constraint.y2 - box.h;
            }
          
            handler.move(x, y)
          });
    }
}