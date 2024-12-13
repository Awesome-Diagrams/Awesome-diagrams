import { Diagram } from "~/model/diagram/Diagram";
import { ConnectorSerialized, DiagramSerialized, ElemSerialized } from "../../model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";
import { Connector } from "~/model/elem/Connector";
import { Circle } from "@svgdotjs/svg.js";

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
        movable: elem.getMovable().getType(),
        constraint: elem.getConstraint(),
        shapeId: elem.getShape().id(),
    })
}

export const serializeConnector = (connector: Connector) : ConnectorSerialized => {
    return ({
        id1: connector.getElem1().getShape().id(),
        id2: connector.getElem2().getShape().id(),
    })
}