import { Diagram } from "~/model/diagram/Diagram";
import { ConnectorSerialized, DiagramSerialized, ElemSerialized, ShapeType} from "../../model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";
import { Connector } from "~/model/elem/Connector";
import { CustomConfig } from "~/model/elem/customs/CustomConfig";

export const serializeDiagram = (diagram: Diagram): DiagramSerialized  => {
    const shapes: ElemSerialized[] = diagram.getElems().map(serializeElem)
    const connectors: ConnectorSerialized[] = diagram.getConnectors().map(serializeConnector)

    return ({
        elems: shapes,
        connectors: connectors,
        height: diagram.getHeight(),
        width: diagram.getWidth(),
        type: diagram.getDiagramType(),
    })
}

export const serializeElem = (elem: Elem): ElemSerialized => {
    return ({
        draggable: elem.getDraggable()!.getType(),
        shape: {
            type: elem.getType(),
            x: elem.getType() === ShapeType.Line ? elem.getX1() : elem.getShape().x() as number,
            y: elem.getType() === ShapeType.Line ? elem.getY1() : elem.getShape().x() as number,
            cx: elem.getShape().cx(),
            cy: elem.getShape().cy(),
            rx: elem.getShape().attr('rx'),
            ry: elem.getShape().attr('ry'),
            r: elem.getShape().attr('r'),
            width: elem.getWidthShape(),
            height: elem.getHeigthShape(),
            path: elem.getPath(),
            x2: elem.getType() === ShapeType.Line ? elem.getX2() : undefined,
            y2: elem.getType() === ShapeType.Line ? elem.getY2() : undefined,
        },
        textElement: {
            color: elem.getText().color,
            fontSize: elem.getText().fontSize,
            text: elem.getText().text
        },
        rect: {
            width: elem.getRect().width() as number,
            height: elem.getRect().height() as number
        },
        color: elem.getColor(),
        customConfig: serializeCustomConfig(elem.getCustomConfig()),
        movable: elem.getMovable().getType(),
        constraint: elem.getConstraint(),
        shapeId: elem.getShape().id(),
        umlData: elem.getUMLClassData(),
    })
}

const serializeCustomConfig = (config: CustomConfig): any => {
    const result: any = {};

    if (config.stroke) {
        result.stroke_color = config.stroke.color || "#000000";
        result.stroke_width = config.stroke.width || 1;
        result.stroke_dasharray = config.stroke.dasharray || undefined;
    }

    if (config.fill) {
        result.fill_color = config.fill.color || "#ffffff";
        result.gradient_enabled = config.fill.gradient?.enabled || false; 
        result.secondColor = config.fill.gradient?.secondColor || "";
    }

    if (config.opacity !== undefined) {
        result.opacity = config.opacity;
    }

    return result;
};

export const serializeConnector = (connector: Connector) : ConnectorSerialized => {
    return ({
        id1: connector.getElem1().getShape().id(),
        id2: connector.getElem2().getShape().id(),
        connectorType: connector.getType(),
        points: connector.getInternalPoints(),
    })
}