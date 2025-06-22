import { Box, G, Rect, Shape } from "@svgdotjs/svg.js";
import { Elem } from "./Elem";
import { SelectionController } from "~/components/tools/SelectionController";
import { CustomConfig } from "./customs/CustomConfig";
import { ShapeSerialized, ShapeType, TextSerialized, UMLClassData } from "../DiagramSerialized";
import { MovableType } from "./movable/MovableType";
import { DraggableType } from "./draggable/DraggableType";

export class ElemBuilder {
    private elem: Elem;

    constructor(svgGroup: G, selectionController?: SelectionController) {
        this.elem = new Elem(svgGroup, selectionController);
    }

    withBaseElem(baseelem: Elem) : ElemBuilder {
        this.elem = baseelem;
        return this;
    }

    withId(id: string): ElemBuilder {
        this.elem.setId(id);
        return this;
    }

    withRect(rect: Rect): ElemBuilder {
        this.elem.setRect(rect);
        return this;
    }

    withColor(color: string): ElemBuilder {
        this.elem.setColor(color);
        return this;
    }

    withCustomConfig(config: CustomConfig): ElemBuilder {
        this.elem.setCustomConfig(config);
        return this;
    }

    withType(type: ShapeType): ElemBuilder {
        this.elem.setType(type);
        return this;
    }

    withShape(shape: Shape): ElemBuilder {
        this.elem.setShape(shape);
        return this;
    }

    withShapeFromScratch(shape: ShapeSerialized): ElemBuilder {
        this.elem.setShapeFromScratch(shape);
        return this;
    }

    withText(textInfo: TextSerialized): ElemBuilder {
        this.elem.setText(textInfo);
        return this;
    }

    withConstraint(box: Box): ElemBuilder {
        this.elem.setConstraint(box);
        return this;
    }

    withMovable(movableType: MovableType): ElemBuilder {
        this.elem.setMovable(movableType);
        return this;
    }

    withDraggable(draggableType: DraggableType): ElemBuilder {
        this.elem.setDraggable(draggableType);
        return this;
    }

    withHeight(height: number) : ElemBuilder {
        this.elem.setHeigth(height);
        return this;
    }

    withWidth(width: number) : ElemBuilder {
        this.elem.setWidth(width);
        return this;
    }

    withUmlData(data: UMLClassData, type: ShapeType) : ElemBuilder {
        if (type === ShapeType.UMLClass) {
            this.elem.setUMLClassData(data);
        } else if(type === ShapeType.UMLInterface){
            this.elem.setUMLInterfaceData(data);
        }
        return this;
    }

    build(): Elem {
        this.elem.configureAll(); // Единоразовая конфигурация в конце
        return this.elem;
    }
}