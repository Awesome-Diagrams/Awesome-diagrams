import { SVG, Svg, Box } from "@svgdotjs/svg.js";
import { Elem } from "../elem/Elem";

export class Diagram {
    private elems: Elem[] = []
    // TODO: extact to config
    private width: number = 1080
    private height: number = 720

    // svg
    private svg: Svg

    constructor() {
        this.svg = SVG().size('100%', '100%')
    }

    setWidth(width: number): Diagram {
        this.width = width

        return this
    }

    setHeight(height: number): Diagram {
        this.height = height

        return this
    }

    getWidth(): number {
        return this.width
    }

    getHeight() {
        return this.height
    }

    getElems() {
        return this.elems
    }

    getSvg() {
        return this.svg
    }

    addElem(elem: Elem) {
        this.elems.push(elem)
    }

    addDefaultElem(): Elem {
        const elem = new Elem(this.svg)
            .setConstraint(new Box(0, 0, this.width, this.height))
            .setMovable('CONSTRAINT')

        this.elems.push(elem)

        return elem
    }

    removeElem(idx: number){
        this.elems = this.elems.filter((_, index) => index !== idx)
    }
}