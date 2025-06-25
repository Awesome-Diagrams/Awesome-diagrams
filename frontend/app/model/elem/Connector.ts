import { Circle, G, Line, PointArray, Polyline, Svg, Marker } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";
import { selectedConnectors, SelectionController } from "~/components/tools/SelectionController";
import { ConnectorType, getInternalPointCount } from "./ConnectorType";
import { Point } from "../Point";
import { ConnectorSerialized } from "../DiagramSerialized";
import { serializeConnector } from "~/internal/serialization/DiagramSerializator";
import { deserializeConnector } from "~/internal/serialization/DiagramDeserializator";

export type UMLConnectorType = ConnectorType | 'inheritance' | 'aggregation' | 'composition' | 'association' | 'dependency';

export class Connector {
    private group: G;
    private line: Polyline;
    private outerLine: Polyline;
    private elem1: Elem;
    private elem2: Elem;
    private isSelected: boolean = false;
    private connectorType: UMLConnectorType = 'polyline';
    private startMarker: Marker | null = null;
    private endMarker: Marker | null = null;

    constructor(elem1: Elem, elem2: Elem, groupSvg: G) {
        this.group = new G();
        this.elem1 = elem1;
        this.elem2 = elem2;

        this.line = new Polyline()
            .stroke({ color: "black", width: 2 })
            .css({ "fill": "none" });

        this.outerLine = new Polyline()
            .stroke({ color: "transparent", width: 20 })
            .attr({ "pointer-events": "stroke" })
            .css({ "fill": "none" });
        
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

    public getIsSelected(): boolean {
        return this.isSelected;
    }

    private updateConnectionPoints() {
        const startPoint = this.getConnectionPoint(this.elem1, this.elem2);
        const endPoint = this.getConnectionPoint(this.elem2, this.elem1);

        this.updatePoint(0, startPoint.x, startPoint.y);

        if (this.connectorType === 'polyline') {
            this.updatePoint(1, startPoint.x, endPoint.y);
        }

        const lastIdx = getInternalPointCount(this.connectorType) + 1;
        this.updatePoint(lastIdx, endPoint.x, endPoint.y);
    }

    private updateLineFromElem1 = (x: number, y: number): void => {
        this.updateConnectionPoints();
    };

    private updateLineFromElem2 = (x: number, y: number): void => {
        this.updateConnectionPoints();
    };

    private getConnectionPoint(sourceElem: Elem, targetElem: Elem): Point {
        const sourceBBox = sourceElem.getGroup().bbox();
        const targetBBox = targetElem.getGroup().bbox();
        
        const sourceCenter = {
            x: sourceBBox.x + sourceBBox.width / 2,
            y: sourceBBox.y + sourceBBox.height / 2
        };
        
        const targetCenter = {
            x: targetBBox.x + targetBBox.width / 2,
            y: targetBBox.y + targetBBox.height / 2
        };
        
        const dx = targetCenter.x - sourceCenter.x;
        const dy = targetCenter.y - sourceCenter.y;
        const angle = Math.atan2(dy, dx);
        
        const isDiamondMarker = this.connectorType === 'aggregation' || 
                              this.connectorType === 'composition';
        
        const edgePoint = this.getEdgeIntersection(sourceBBox, angle, sourceCenter);
        
        if (isDiamondMarker && sourceElem === this.elem2) {
            const markerSize = 10;
            const offsetX = markerSize * Math.cos(angle);
            const offsetY = markerSize * Math.sin(angle);
            
            return {
                x: edgePoint.x + offsetX,
                y: edgePoint.y + offsetY
            };
        }
        
        return edgePoint;
    }

    private getEdgeIntersection(bbox: BBox, angle: number, center: Point): Point {
        const halfWidth = bbox.width / 2;
        const halfHeight = bbox.height / 2;
        
        const tanAngle = Math.tan(angle);
        const cotAngle = 1 / Math.tan(angle);
        
        const intersections = [
            { // Правая грань
                x: bbox.x + bbox.width,
                y: center.y + tanAngle * halfWidth,
                valid: !isNaN(tanAngle)
            },
            { // Левая грань
                x: bbox.x,
                y: center.y - tanAngle * halfWidth,
                valid: !isNaN(tanAngle)
            },
            { // Нижняя грань
                x: center.x + halfHeight * cotAngle,
                y: bbox.y + bbox.height,
                valid: !isNaN(cotAngle)
            },
            { // Верхняя грань
                x: center.x - halfHeight * cotAngle,
                y: bbox.y,
                valid: !isNaN(cotAngle)
            }
        ].filter(i => i.valid);
        
        for (const point of intersections) {
            const pointAngle = Math.atan2(point.y - center.y, point.x - center.x);
            if (Math.abs(this.normalizeAngle(angle) - this.normalizeAngle(pointAngle)) < 0.1) {
                if (point.x >= bbox.x && point.x <= bbox.x + bbox.width &&
                    point.y >= bbox.y && point.y <= bbox.y + bbox.height) {
                    return point;
                }
            }
        }
        
        return center;
    }

    private normalizeAngle(angle: number): number {
        return ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    }

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

    public serialize() : ConnectorSerialized {
        return serializeConnector(this);
    }

    public deserialize(conSerialized: ConnectorSerialized, elems : Elem[], group: G): Connector {
        return deserializeConnector(conSerialized, elems, group);
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

     private configurePoints(connectorType: UMLConnectorType) {
        this.line.clear();
        this.outerLine.clear();
        this.removeMarkers();

        const startPoint = this.getConnectionPoint(this.elem1, this.elem2);
        const endPoint = this.getConnectionPoint(this.elem2, this.elem1);

        const x1 = startPoint.x;
        const y1 = startPoint.y;
        const x2 = endPoint.x;
        const y2 = endPoint.y;

        switch(connectorType) {
            case 'polyline': {
                const internalX = x1;
                const internalY = y2;
                this.line.plot([[x1, y1], [internalX, internalY], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [internalX, internalY], [x2, y2]]);
                break;
            }
            case 'straight': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);
                break;
            }
            case 'inheritance': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);
                this.addArrowMarker('end', true); // Пустой треугольник
                break;
            }
            case 'aggregation': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);
                this.addDiamondMarker('end', false); // Пустой ромб
                break;
            }
            case 'composition': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);
                this.addDiamondMarker('end', true); // Заполненный ромб
                break;
            }
            case 'association': {
                this.line.plot([[x1, y1], [x2, y2]]);
                this.outerLine.plot([[x1, y1], [x2, y2]]);
                this.addArrowMarker('end', false); // Простая стрелка
                break;
            }
            case 'dependency': {
                this.line.plot([[x1, y1], [x2, y2]]).stroke({ dasharray: "5,5" });
                this.outerLine.plot([[x1, y1], [x2, y2]]).stroke({ dasharray: "5,5" });
                this.addArrowMarker('end', false); // Пунктирная линия со стрелкой
                break;
            }
            default: {
                throw `unknown type ${connectorType}`;
            }
        }
    }

    
    private getEdgePoint(bbox: { x: number, y: number, width: number, height: number }, angle: number): Point {
        const center = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
        
        const normalizedAngle = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        
        let x, y;
        
        if (normalizedAngle >= 0 && normalizedAngle < Math.PI / 2) {
            x = center.x + bbox.width / 2;
            y = center.y + Math.tan(normalizedAngle) * bbox.width / 2;
        } else if (normalizedAngle >= Math.PI / 2 && normalizedAngle < Math.PI) {
            x = center.x - bbox.width / 2;
            y = center.y - Math.tan(normalizedAngle - Math.PI) * bbox.width / 2;
        } else if (normalizedAngle >= Math.PI && normalizedAngle < 3 * Math.PI / 2) {
            x = center.x - bbox.width / 2;
            y = center.y + Math.tan(normalizedAngle - Math.PI) * bbox.width / 2;
        } else {
            x = center.x + bbox.width / 2;
            y = center.y - Math.tan(normalizedAngle - 2 * Math.PI) * bbox.width / 2;
        }

        if (y > center.y + bbox.height / 2) {
            y = center.y + bbox.height / 2;
            x = center.x + (bbox.height / 2) / Math.tan(normalizedAngle);
        } else if (y < center.y - bbox.height / 2) {
            y = center.y - bbox.height / 2;
            x = center.x - (bbox.height / 2) / Math.tan(normalizedAngle);
        }
        
        return { x, y };
    }

    private addArrowMarker(position: 'start' | 'end', isHollow: boolean): void {
        const marker = this.group.marker(10, 10, (add: Marker) => {
            add.polygon(isHollow ? '0,0 10,5 0,10 2,5' : '0,0 10,5 0,10')
                .fill(isHollow ? 'white' : 'black')
                .stroke({ color: 'black', width: 1 });
        }).ref(position === 'start' ? 0 : 10, 5);
        
        if (position === 'start') {
            this.startMarker = marker;
            this.line.marker('start', marker);
        } else {
            this.endMarker = marker;
            this.line.marker('end', marker);
        }
    }

    private addDiamondMarker(position: 'start' | 'end', isFilled: boolean): void {
        const marker = this.group.marker(10, 10, (add: Marker) => {
            add.polygon('5,0 10,5 5,10 0,5')
                .fill(isFilled ? 'black' : 'white')
                .stroke({ color: 'black', width: 1 });
        }).ref(5, 5);
        
        if (position === 'start') {
            this.startMarker = marker;
            this.line.marker('start', marker);
        } else {
            this.endMarker = marker;
            this.line.marker('end', marker);
        }
    }

    private removeMarkers(): void {
        if (this.startMarker) {
            this.startMarker.remove();
            this.startMarker = null;
            this.line.marker('start');
        }
        if (this.endMarker) {
            this.endMarker.remove();
            this.endMarker = null;
            this.line.marker('end');
        }
    }
}

interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}