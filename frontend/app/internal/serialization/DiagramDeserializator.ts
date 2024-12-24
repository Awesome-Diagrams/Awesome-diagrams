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
        res.addElem(deserializeElem(elem, res.getSelectionController(), res.getGroup()))
    )

    diagramSerialized.connectors.forEach(connector =>
        res.addConnector(deserializeConnector(connector, res.getElems(), res.getGroup()))
    )

    return res
}

export const deserializeElem = (elemSerialized: ElemSerialized, selController : SelectionController, group: G): Elem => {
    const res = new Elem(group, selController)
        .setShapeFromScratch(elemSerialized.shape)
        .setRect(new Rect().width(elemSerialized.rect.width)
                           .height(elemSerialized.rect.height)
                           .fill('transparent')
                           .stroke({ color: 'white', width: 1 }).opacity(0))
        .setText(elemSerialized.textElement.text, elemSerialized.textElement.fontSize, elemSerialized.textElement.color)
        .setConstraint(elemSerialized.constraint)
        .setMovable(elemSerialized.movable)
        .setDraggable(elemSerialized.draggable)
        .setId(elemSerialized.shapeId)
        .setCustomConfig(
                {
                stroke: {
                    color: elemSerialized.customConfig.stroke_color,
                    width: elemSerialized.customConfig.stroke_width,
                    dasharray: elemSerialized.customConfig.stroke_dasharray,
                },
                fill: {
                    color: elemSerialized.customConfig.fill_color,
                    gradient: {
                        enabled: elemSerialized.customConfig.gradient_enabled,
                        secondColor: elemSerialized.customConfig.secondColor,
                    },
                },
                opacity: elemSerialized.customConfig.opacity,
            })

    return res
}


export const deserializeConnector = (conSerialized: ConnectorSerialized, elems : Elem[], group: G): Connector => {
    console.log("id1 = " + conSerialized.id1 + " id2 = " + conSerialized.id2);
    const elem1 : Elem = elems.find(elem => elem.getShape().id() === conSerialized.id1)!;
    const elem2 : Elem = elems.find(elem => elem.getShape().id() === conSerialized.id2)!;

    return new Connector(elem1, elem2, group)
        .setType(conSerialized.connectorType)
        .setInternalPoints(conSerialized.points);
}