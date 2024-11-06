import { Svg, Text, Rect, G, Circle, Shape, Box } from "@svgdotjs/svg.js";
import { Draggable } from "../draggable/Draggable";
import { Movable } from "../movable/Movable";
import { ConstraintMovable } from "../movable/ConstraintMovable";
import { GeneralDraggable } from "../draggable/GeneralDraggable";

export class UseCaseShape {
    private draggable?: Draggable;
    private group: G;
    private shape: Shape;
    private textElement: Text;
    private rect: Rect;
    private svg: Svg;
    private movable: Movable;

    constructor(shape: Shape, svg: Svg, constraint: Box) {
        this.shape = shape;
        this.svg = svg;

        this.group = new G();
        this.group.add(this.shape);

        this.textElement = new Text().plain('').font({ fill: 'white', size: 16, anchor: 'middle' });
        this.group.add(this.textElement);

        this.rect = new Rect().width(100).height(30).fill('transparent').stroke({ color: 'white', width: 1 }).opacity(0);
        this.group.add(this.rect);

        svg.add(this.group);
        this.movable = new ConstraintMovable(this.group, constraint);
        this.setDraggable(new GeneralDraggable());

        this.updateTextAndRectPosition();

        this.rect.on('click', () => this.startEditing());
    }

    public setDraggable(draggable: Draggable): UseCaseShape {
        this.draggable = draggable;
        this.draggable.init(this.group, this.movable);
        return this;
    }

    private updateTextAndRectPosition() {
        const cx = this.shape.cx();
        const cy = this.shape.cy();
        this.textElement.cx(cx);
        this.textElement.cy(cy);
        this.rect.cx(cx).cy(cy);
    }


    private startEditing() {
        const prevText = this.textElement.text();


        const textarea = document.createElement('textarea');
        textarea.value = this.textElement.text();
        textarea.style.position = 'absolute';

        const { left, top, width, height } = this.group.node.getBoundingClientRect();
        textarea.style.left = `${left + width / 2}px`;
        textarea.style.top = `${top + height / 2}px`;
        textarea.style.transform = 'translate(-50%, -50%)';
        textarea.style.fontSize = '16px';
        textarea.style.padding = '4px';

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.addEventListener('blur', () => {
            this.textElement.text(textarea.value);
            this.updateTextAndRectPosition();
            textarea.remove();
        });
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                textarea.value = prevText;
                textarea.blur();
            }
        });
    }
}
