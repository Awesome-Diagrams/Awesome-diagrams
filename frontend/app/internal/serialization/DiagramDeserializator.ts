import { SelectionController } from "~/components/tools/SelectionController";
import { Rect, SVG, Svg, Text, G } from "@svgdotjs/svg.js";
import { Diagram } from "~/model/diagram/Diagram";
import { DiagramSerialized, ElemSerialized } from "~/model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";

export const deserializeDiagram = (diagramSerialized: DiagramSerialized): Diagram => {
    const res = new Diagram()
    
    res.setHeight(diagramSerialized.height)
    res.setWidth(diagramSerialized.width)
    diagramSerialized.elems.forEach(elem => 
        res.addElem(deserializeElem(elem, res.getSelectionController(), res.getGroup()))
    )

    return res
}

export const deserializeElem = (elemSerialized: ElemSerialized, selController : SelectionController, group?: G): Elem => {
    const res = new Elem(group, selController)
        .setShape(SVG(elemSerialized.shape))
        .setRect(new Rect().svg(elemSerialized.rect))
        .setText(new Text().svg(elemSerialized.textElement))
        .setConstraint(elemSerialized.constraint)
        .setMovable(elemSerialized.movable)
        .setDraggable(elemSerialized.draggable)

    return res
}