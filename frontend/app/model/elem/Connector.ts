import { G, Line, Svg } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";
import { selectedConnectors } from "~/components/tools/SelectionController";

export class Connector {
    private group: G;
    private line: Line;
    private outerLine: Line;
    private elem1 : Elem;
    private elem2 : Elem;
    private isSelected: boolean = false;

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

        this.outerLine = new Line()
            .plot(x1, y1, x2, y2)
            .stroke({ color: "transparent", width: 20 })
            .attr({ "pointer-events": "stroke" });
        
        this.group.add(this.outerLine);
        this.group.add(this.line);
        
        groupSvg.add(this.group);


        elem1.on("move", this.updateLineFromElem1);
        elem2.on("move", this.updateLineFromElem2);

        this.outerLine.on("click", (e) => {
            e.stopPropagation();
            this.toggleSelection();
        });
    }

    public isConnectedTo(elem: Elem): boolean {
        return this.elem1 === elem || this.elem2 === elem;
    }


    public remove() {
        this.group.remove();
    }

    private toggleSelection(): void {
        this.isSelected = !this.isSelected;

        if (this.isSelected) {
            this.line.stroke({ color: "red", width: 3 });
            selectedConnectors.push(this);
        } else {
            this.line.stroke({ color: "black", width: 2 });
            selectedConnectors.filter((con) => this !== con);
        }
    }


    public deselect(): void {
        this.isSelected = false;
        this.line.stroke({ color: "black", width: 2 });
        selectedConnectors.filter((con) => this !== con);
    }

    // Проверка, выделен ли коннектор
    public getIsSelected(): boolean {
        return this.isSelected;
    }


    private updateLineFromElem1 = (x: number, y: number): void => {
        this.line.plot(x, y, this.elem2.getGroup().cx() as number, this.elem2.getGroup().cy() as number);
        this.outerLine.plot(x, y, this.elem2.getGroup().cx() as number, this.elem2.getGroup().cy() as number);
    };


    private updateLineFromElem2 = (x: number, y: number): void => {
        this.line.plot(this.elem1.getGroup().cx() as number, this.elem1.getGroup().cy() as number, x, y);
        this.outerLine.plot(this.elem1.getGroup().cx() as number, this.elem1.getGroup().cy() as number, x, y);
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
