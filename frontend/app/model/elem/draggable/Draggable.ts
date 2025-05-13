import { Elem } from "../Elem";
import { DraggableType } from "./DraggableType";

export interface Draggable {
    setDraggable(isDraggable: boolean): Draggable;

    getType(): DraggableType;
}