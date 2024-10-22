import { Shape, Svg } from "@svgdotjs/svg.js";
import { Draggable } from "./draggable/Draggable";



export class SvgShape {
    private draggable?: Draggable;
    private shape: Shape;
    private svg: Svg;

    constructor(shape: Shape, svg: Svg) {
        this.shape = shape;
        this.svg = svg;

        svg.add(shape);
    }

    public setDraggable(draggable: Draggable): SvgShape {
        this.draggable = draggable;

        this.draggable.init(this.shape)
        this.shape.on('dragmove.namespace', draggable.onDrag);

        return this;
    }
}