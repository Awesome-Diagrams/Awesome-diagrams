import { Circle, G, Line, PointArray, Polyline, Svg } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";
import { selectedConnectors, SelectionController } from "~/components/tools/SelectionController";
import { ConnectorType, getInternalPointCount } from "./ConnectorType";
import { Point } from "../Point";

export class Connector {
    private group: G;
    private line: Polyline;
    private outerLine: Polyline;
    private elem1 : Elem;
    private elem2 : Elem;
    private isSelected: boolean = false;
    private connectorType: ConnectorType = 'polyline';

    constructor(elem1: Elem, elem2: Elem, groupSvg: G) {
        this.group = new G();
        this.elem1 = elem1;
        this.elem2 = elem2;

        this.line = new Polyline()
            .stroke({ color: "black", width: 2,  })
            .css({"fill": "none"})

        this.outerLine = new Polyline()
            .stroke({ color: "transparent", width: 20 })
            .attr({ "pointer-events": "stroke" })
            .css({"fill": "none"});
        
        this.configurePoints(this.connectorType);
        
        this.group.add(this.outerLine);
        this.group.add(this.line);
        
        groupSvg.add(this.group);
        this.group.back();

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

    public setType(connectorType: ConnectorType): Connector {
        this.connectorType = connectorType;

        this.configurePoints(this.connectorType);

        return this;
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
        this.updatePoint(0, x, y);

        switch(this.connectorType) {
            case 'polyline':
                this.updatePoint(1, x, this.line.array()[1][1]);
                break;
        }
    };


    private updateLineFromElem2 = (x: number, y: number): void => {
        this.updatePoint(getInternalPointCount(this.connectorType) + 1, x, y);

        switch(this.connectorType) {
            case 'polyline':
                this.updatePoint(1, this.line.array()[1][0], y);
                break;
        }
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

    public getType(): ConnectorType {
        return this.connectorType;
    }

    public getInternalPoints(): Point[] {
        const len = this.line.array().length;
        return this.line.array()
            .filter((_, i) => i !== 0 && i !== len - 1)
            .map((val) => {
                return { x: val[0], y: val[1] };
            });
    }

    public setInternalPoints(points: Point[]): Connector {
        if (points.length !== getInternalPointCount(this.connectorType)) {
            throw("illegal point size")
        }

        for (let i = 1; i <= getInternalPointCount(this.connectorType); i++) {
            this.updatePoint(
                i,
                points[i - 1].x,
                points[i - 1].y,
            );
        }

        return this;
    }

    private updatePoint(idx: number, x: number, y: number) {
        // TODO: resolve this
        const newArray = new PointArray(this.line.plot().map((elem, i) => idx === i ? [x, y] : elem));
        this.line.plot(newArray);
        this.outerLine.plot(newArray);
    }

    private configurePoints(connectorType: ConnectorType) {
        this.line.clear();
        this.outerLine.clear();

        const x1 = this.elem1.getGroup().cx() as number;
        const y1 = this.elem1.getGroup().cy() as number;
        const x2 = this.elem2.getGroup().cx() as number;
        const y2 = this.elem2.getGroup().cy() as number;

        switch(connectorType) {
            case 'polyline': {
                // inflection point in polyline
                const internalX = x1;
                const internalY = y2;
                this.line.plot([[x1, y1], [internalX, internalY], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [internalX, internalY], [x2, y2]]);

                break;
            }
            case 'single': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);

                break;
            }
            default: {
                throw `unkown type ${connectorType}`;
            }
        }
    }
}
