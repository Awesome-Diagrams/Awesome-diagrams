import { SVG, Svg } from "@svgdotjs/svg.js";
import { Elem } from "../elem/Elem";
import { ShapeType } from "../elem/ShapeType";

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
        return this
    }

    getSvg() {
        return this.svg
    }

    addElem(shapeType: ShapeType): Elem {
        const elem = new Elem(shapeType, this.svg)
            .setConstraint(this.width, this.height)
            .setMovable('CONSTRAINT')

        this.elems.push(elem)

        return elem
    }

    removeElem(idx: number){
        this.elems = this.elems.filter((_, index) => index !== idx)
    }
}