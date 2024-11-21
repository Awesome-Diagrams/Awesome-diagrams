import { Svg } from "@svgdotjs/svg.js";
import { Elem } from "../elem/Elem";
import { ShapeType } from "../elem/ShapeType";

export class Diagram {
    private elems: Elem[] = []
    // TODO: extact to config
    private width: number = 1080
    private height: number = 720

    // svg
    private svg: Svg

    constructor(svg: Svg) {
        this.svg = svg
    }

    setWidth(width: number): Diagram {
        this.width = width

        return this
    }

    setHeight(height: number): Diagram {
        this.height = height

        return this
    }

    addElem(shapeType: ShapeType): Elem {
        console.log(this.svg.children())
        const elem = new Elem(shapeType, this.svg)
            //.setConstraint(this.width, this.height)
            //.setMovable('CONSTRAINT')

        this.elems.push(elem)

        return elem
    }

    removeElem(idx: number){
        this.elems = this.elems.filter((_, index) => index !== idx)
    }
}