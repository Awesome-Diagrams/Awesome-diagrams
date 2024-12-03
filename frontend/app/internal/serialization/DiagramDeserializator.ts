import { Svg } from "@svgdotjs/svg.js";
import { Diagram } from "~/model/diagram/Diagram";
import { DiagramSerialized, ElemSerialized } from "~/model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";

export const deserializeDiagram = (diagramSerialized: DiagramSerialized): Diagram => {
    var res = new Diagram()
    
    res.setHeight(diagramSerialized.height)
    res.setWidth(diagramSerialized.width)
    diagramSerialized.elems.forEach(elem => 
        res.addElem(deserializeElem(elem, res.getSvg()))
    )

    return res
}

export const deserializeElem = (elemSerialized: ElemSerialized, svg?: Svg): Elem => {
    var res = new Elem(svg)
        .setShape(elemSerialized.shape)
        .setGroup(elemSerialized.group)

    return res
}