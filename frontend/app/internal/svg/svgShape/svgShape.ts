import { Shape, Svg } from "@svgdotjs/svg.js";
import { Draggable } from "./draggable/Draggable";
import { Movable } from "./movable/Movable";



export class SvgShape {
    private draggable?: Draggable;
    private shape: Shape;
    private movable: Movable;
    private svg: Svg;

    constructor(shape: Shape, svg: Svg, movable: Movable) {
        this.movable = movable;
        this.shape = shape;
        this.svg = svg;

        svg.add(shape);
    }

    public setDraggable(draggable: Draggable): SvgShape {
        this.draggable = draggable;

        this.draggable.init(this.shape, this.movable);

        return this;
    }
}