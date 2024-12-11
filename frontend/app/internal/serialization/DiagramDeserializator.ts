import { SelectionController } from "~/components/tools/SelectionController";
import { Rect, SVG, Svg, Text, G } from "@svgdotjs/svg.js";
import { Diagram } from "~/model/diagram/Diagram";
import { ConnectorSerialized, DiagramSerialized, ElemSerialized } from "~/model/DiagramSerialized";
import { Connector } from "~/model/elem/Connector";
import { Elem } from "~/model/elem/Elem";

export const deserializeDiagram = (diagramSerialized: DiagramSerialized): Diagram => {
    const res = new Diagram()
    
    res.setHeight(diagramSerialized.height)
    res.setWidth(diagramSerialized.width)
    diagramSerialized.elems.forEach(elem => 
        res.addElem(deserializeElem(elem, res.getSelectionController(), res.getGroup()));
    )

    diagramSerialized.connectors.forEach(connector =>
        res.addConnector(deserializeConnector(connector, res.getElems(), res.getSvg()))
    )

    diagramSerialized.connectors.forEach(connector =>
        res.addConnector(deserializeConnector(connector, res.getElems(), res.getSvg()))
    )

    return res
}

export const deserializeElem = (elemSerialized: ElemSerialized, selController : SelectionController, group: G): Elem => {
    const res = new Elem(group, selController)
        .setShape(SVG(elemSerialized.shape))
        .setRect(new Rect().svg(elemSerialized.rect))
        .setText(new Text().svg(elemSerialized.textElement))
        .setConstraint(elemSerialized.constraint)
        .setMovable(elemSerialized.movable)
        .setDraggable(elemSerialized.draggable)
        .setId(elemSerialized.shapeId)

    return res
}

export const deserializeConnector = (conSerialized: ConnectorSerialized, elems : Elem[], svg?: Svg): Connector => {
    console.log("id1 = " + conSerialized.id1 + " id2 = " + conSerialized.id2);
    const elem1 : Elem = elems.find(elem => elem.getShape().id() === conSerialized.id1)!;
    const elem2 : Elem = elems.find(elem => elem.getShape().id() === conSerialized.id2)!;

    return new Connector(elem1, elem2, svg!);
}