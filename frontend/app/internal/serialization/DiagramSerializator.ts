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
        draggable: elem.getDraggable()?.getType(),
        group: elem.getGroup(),
        shape: elem.getShape(),
        textElement: elem.getTextElement(),
        rect: elem.getRect(),
        movable: elem.getMovable().getType(),
        isSelected: elem.getIsSelected(),
        selectionOutline: elem.getSelectionOutline(),
    })
}