import { Draggable } from "./Draggable";
import { GeneralDraggable } from "./GeneralDraggable";
import { Box } from "@svgdotjs/svg.js";

export class ConstraintDraggable extends GeneralDraggable implements Draggable {
    private constraint: Box;
    
    constructor(contraint: Box) {
        super();
        this.constraint = contraint;
    }

    public onDrag = (e: Event) => {
        const { handler, box } = (e as any).detail
        e.preventDefault();
        
        let { x, y } = box;

        if (x < this.constraint.x) {
            x = this.constraint.x;
        }
        
        if (y < this.constraint.y) {
            y = this.constraint.y;
        }
        
        if (box.x2 > this.constraint.x2) {
            x = this.constraint.x2 - box.w;
        }
        
        if (box.y2 > this.constraint.y2) {
            y = this.constraint.y2 - box.h;
        }
        
        handler.move(x, y)
    }
}