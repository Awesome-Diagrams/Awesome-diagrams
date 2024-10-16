import { Shape, Svg } from "@svgdotjs/svg.js";


export class SvgShape {
    constructor(shape: Shape, svg: Svg) {
        svg.add(shape);
    }

}