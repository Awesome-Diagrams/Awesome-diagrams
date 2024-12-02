import { G, Shape } from "@svgdotjs/svg.js";
import { Movable } from "./Movable";
import { MovableType } from "./MovableType";

export class GeneralMovable implements Movable {
    private group: G;

    constructor(group: G) {
        this.group = group;
    }

    public move(x: number, y: number) {
        this.group.move(x, y);
    }

    public getType(): MovableType {
        return 'GENERAL'
    }
}