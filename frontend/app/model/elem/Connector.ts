import { G, Line, Svg } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";

export class Connector {
    private group: G;
    private line: Line;

    constructor(elem1: Elem, elem2: Elem, svg: Svg) {
        this.group = new G();

        const x1 = elem1.getGroup().cx() as number;
        const y1 = elem1.getGroup().cy() as number;
        const x2 = elem2.getGroup().cx() as number;
        const y2 = elem2.getGroup().cy() as number;

        this.line = new Line()
            .plot(x1, y1, x2, y2)
            .stroke({ color: "black", width: 2 });

        this.group.add(this.line);

        svg.add(this.group);

        elem1.getShape().on("dragmove", () => this.updateLine(elem1, elem2));
        elem2.getShape().on("dragmove", () => this.updateLine(elem1, elem2));
    }

    private updateLine(elem1: Elem, elem2: Elem): void {
        const x1 = elem1.getGroup().cx() as number;
        const y1 = elem1.getGroup().cy() as number;
        const x2 = elem2.getGroup().cx() as number;
        const y2 = elem2.getGroup().cy() as number;

        this.line.plot(x1, y1, x2, y2);
    }

    public getGroup(): G {
        return this.group;
    }
}
