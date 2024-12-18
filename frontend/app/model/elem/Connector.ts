import { G, Line, Svg } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";

export class Connector {
    private group: G;
    private line: Line;
    private elem1 : Elem;
    private elem2 : Elem;

    constructor(elem1: Elem, elem2: Elem, groupSvg: G) {
        this.group = new G();
        this.elem1 = elem1;
        this.elem2 = elem2;

        const x1 = elem1.getGroup().cx() as number;
        const y1 = elem1.getGroup().cy() as number;
        const x2 = elem2.getGroup().cx() as number;
        const y2 = elem2.getGroup().cy() as number;

        this.line = new Line()
            .plot(x1, y1, x2, y2)
            .stroke({ color: "black", width: 2 });

        this.group.add(this.line);

        groupSvg.add(this.group);

        elem1.on("move", this.updateLineFromElem1);
        elem2.on("move", this.updateLineFromElem2);
    }


    private updateLineFromElem1 = (x: number, y: number): void => {
        this.line.plot(x, y, this.elem2.getGroup().cx() as number, this.elem2.getGroup().cy() as number);
    };


    private updateLineFromElem2 = (x: number, y: number): void => {
        this.line.plot(this.elem1.getGroup().cx() as number, this.elem1.getGroup().cy() as number, x, y);
    };

    public getGroup(): G {
        return this.group;
    }

    public getElem1() : Elem {
        return this.elem1;
    }
    
    public getElem2() : Elem {
        return this.elem2;
    }
}
