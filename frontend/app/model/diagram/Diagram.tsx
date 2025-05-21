import { SVG, Svg, Box, G } from "@svgdotjs/svg.js";
import { Elem } from "../elem/Elem";
import { selectedConnectors, selectedShapes, SelectionController } from "~/components/tools/SelectionController";
import { Connector } from "../elem/Connector";
import { ElemBuilder } from "../elem/ElemBuilder";
import { CustomSchema } from "../schema/CustomSchema";

export class Diagram {
    private elems: Elem[] = []
    private connectors: Connector[] = []
    // TODO: extact to config
    private width: number = 1080
    private height: number = 720

    // SVG и группа
    private svg: Svg;
    private group: G;

    // Текущий масштаб группы
    private scale: number = 1;
    private selectionController : SelectionController;

    private schema: CustomSchema;
    
    constructor(diagramSchema: CustomSchema) {
        this.svg = SVG().size("100%", "100%");

        this.schema = diagramSchema;

        // Создаём группу для элементов
        this.group = this.svg.group();
        this.selectionController = new SelectionController(this.svg);
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


    getConnectors() {
        return this.connectors;
    }

    getSvg(): Svg {
        return this.svg;
    }

    getGroup(): G {
        return this.group;
    }

    getSelectionController() {
        return this.selectionController;
    }

    public getSchema() {
        return this.schema;
    }

    addConnector(connector: Connector) {
        this.connectors.push(connector);
    }

    getSelectedElem(): Elem | null {
        return (this.selectionController.getSelectedShapes().length === 1 
            ? this.selectionController.getSelectedShapes()[0] 
            : null
        );
    }

    getTwoSelectedElems(): [Elem, Elem] | null {
        return this.selectionController.getTwoSelectedShapes();
    }

    addElem(elem: Elem) {
        this.elems.push(elem);
    }

    addDefaultElem(): Elem {
        const elembuilder = new ElemBuilder(this.group, this.selectionController);
        const elem = elembuilder
            .withConstraint(new Box(0, 0, this.width, this.height))
            .withMovable('MULTI')
            .build();

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

    deleteSelectedElems() {
        selectedConnectors.forEach((con) => con.remove());

        this.elems = this.elems.filter((elem) => {
            if (elem.getIsSelected()) {
                elem.remove();
                return false;
            }
            return true;
        });
    

        selectedShapes.forEach((elem) => {
            this.deleteConnectorsForElem(elem);
        });
    }

    combineElements() {
        if (selectedShapes.length !== 2) {
            return;
        }
        const first = selectedShapes[0];
        const second = selectedShapes[1];

        first.combineElement(second);
    }

    excludeElements() {
        if (selectedShapes.length !== 2) {
            return;
        }
        const first = selectedShapes[0];
        const second = selectedShapes[1];

        first.excludeElement(second);
    }
    
    private deleteConnectorsForElem(elem: Elem) {
        this.connectors = this.connectors.filter((connector) => {
            const isConnected = connector.isConnectedTo(elem);
            if (isConnected) {
                connector.remove();
            }
            return !isConnected;
        });
    }
}