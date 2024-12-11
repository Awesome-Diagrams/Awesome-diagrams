import { Diagram } from "~/model/diagram/Diagram";
import { ConnectorSerialized, DiagramSerialized, ElemSerialized } from "../../model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";
import { Connector } from "~/model/elem/Connector";

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
        shape: elem.getShape().svg(),
        textElement: elem.getTextElement().svg(),
        rect: elem.getRect().svg(),
        movable: elem.getMovable().getType(),
        isSelected: elem.getIsSelected(),
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