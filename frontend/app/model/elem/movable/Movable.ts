import { MovableType } from "./MovableType";

export interface Movable {
    move(x: number, y: number): void;

    getType(): MovableType;
}