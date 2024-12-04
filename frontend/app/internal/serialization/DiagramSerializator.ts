import { Diagram } from "~/model/diagram/Diagram";
import { DiagramSerialized, ElemSerialized } from "../../model/DiagramSerialized";
import { Elem } from "~/model/elem/Elem";

export const serializeDiagram = (diagram: Diagram): DiagramSerialized  => {
    const shapes: ElemSerialized[] = diagram.getElems().map(serializeElem)

    return ({
        elems: shapes,
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
    })
}