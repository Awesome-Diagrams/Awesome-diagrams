import { Diagram } from "~/model/diagram/Diagram";
import { ConnectorSerialized, DiagramSerialized, ElemSerialized} from "../../model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";
import { Connector } from "~/model/elem/Connector";
import { Circle } from "@svgdotjs/svg.js";
import { CustomConfig } from "~/model/elem/customs/CustomConfig";

export const serializeDiagram = (diagram: Diagram): DiagramSerialized  => {
    const shapes: ElemSerialized[] = diagram.getElems().map(serializeElem)
    const connectors: ConnectorSerialized[] = diagram.getConnectors().map(serializeConnector)

    return ({
        elems: shapes,
        connectors: connectors,
        height: diagram.getHeight(),
        width: diagram.getWidth()
    })
}

export const serializeElem = (elem: Elem): ElemSerialized => {
    return ({
        draggable: elem.getDraggable()!.getType(),
        shape: {
            type: elem.getShape().type,
            x: elem.getShape().x() as number,
            y: elem.getShape().y() as number,
            cx: elem.getShape().cx(),
            cy: elem.getShape().cy(),
            height: elem.getShape().attr('height'),
            width: elem.getShape().attr('width'),
            rx: elem.getShape().attr('rx'),
            ry: elem.getShape().attr('ry'),
            r: elem.getShape().attr('r'),
        },
        textElement: {
            color: elem.getTextElement().font('fill'),
            fontSize: parseInt(elem.getTextElement().font('size')),
            text: elem.getTextElement().text()

        },
        rect: {
            width: elem.getRect().width() as number,
            height: elem.getRect().height() as number
        },
        customConfig: serializeCustomConfig(elem.getCustomConfig()),
        movable: elem.getMovable().getType(),
        constraint: elem.getConstraint(),
        shapeId: elem.getShape().id(),
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
    })
}