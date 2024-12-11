import { SVG, Svg, Box, G } from "@svgdotjs/svg.js";
import { Elem } from "../elem/Elem";

export class Diagram {
    private elems: Elem[] = [];
    private width: number = 1080;
    private height: number = 720;

    // SVG и группа
    private svg: Svg;
    private group: G;

    // Текущий масштаб группы
    private scale: number = 1;

    constructor() {
        this.svg = SVG().size("100%", "100%");

        // Создаём группу для элементов
        this.group = this.svg.group();
    }

    setWidth(width: number): Diagram {
        this.width = width;
        return this;
    }

    setHeight(height: number): Diagram {
        this.height = height;
        return this;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getElems(): Elem[] {
        return this.elems;
    }

    getSvg(): Svg {
        return this.svg;
    }

    getGroup(): G {
        return this.group;
    }

    addElem(elem: Elem) {
        this.elems.push(elem);
    }

    addDefaultElem(): Elem {
        // TODO make better
        const elem = new Elem(this.group)
            // .setConstraint(new Box(0, 0, this.width, this.height))
            // .setMovable("CONSTRAINT");

        this.elems.push(elem);

        return elem;
    }

    removeElem(idx: number) {
        this.elems = this.elems.filter((_, index) => index !== idx);
    }

    scaleGroup(factor: number) {
        this.scale *= factor;
        this.group.transform({ scale: this.scale });
    }
}