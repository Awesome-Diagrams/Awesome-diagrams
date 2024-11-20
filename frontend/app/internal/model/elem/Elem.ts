import { Svg, Text, Rect, G, Shape, Box, Circle, Ellipse } from "@svgdotjs/svg.js";
import { Draggable } from "./draggable/Draggable";
import { Movable } from "./movable/Movable";
import { ConstraintMovable } from "./movable/ConstraintMovable";
import { GeneralDraggable } from "./draggable/GeneralDraggable";
import { ShapeType } from "./ShapeType";
import { GeneralMovable } from "./movable/GeneralMovable";
import { MovableType } from "./movable/MovableType";
import { DraggableType } from "./draggable/DraggableType";

export class Elem {

    // TODO: extract in constants
    private selRectGapSize : number = 20;

    private draggable?: Draggable;
    private movable: Movable;
    private isSelected: boolean = false;

    // svg
    private svg: Svg;
    private selectionOutline?: Rect; 
    private group: G;
    private shape: Shape;
    private textElement: Text;
    private rect: Rect;
    private constraint: Box;

    constructor(shapeType: ShapeType, svg: Svg) {

        // TODO: add to config
        switch (shapeType) {
            case 'CIRCLE':
                this.shape = new Circle({ r: 50, cx: 100, cy: 100 });
                break;
            case 'OVAL':
                this.shape = new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 });
                break;
            case 'RECTANGLE':
                this.shape = new Rect({ width: 140, height: 90, x: 100, y: 100 });
                break;
            case 'SQUARE':
                this.shape = new Rect({ width: 90, height: 90, x: 100, y: 100 });
                break;
            case 'TRIANGLE':
                // FIXME
                this.shape = new Circle({ r: 50, cx: 100, cy: 100 })
                break;
        }

        this.svg = svg;
        this.svg.add(this.shape);

        this.group = new G();
        this.group.add(this.shape);

        this.textElement = new Text().plain('').font({ fill: 'white', size: 16, anchor: 'middle' });
        this.group.add(this.textElement);

        this.rect = new Rect().width(100).height(30).fill('transparent').stroke({ color: 'white', width: 1 }).opacity(0);
        this.group.add(this.rect);

        this.selectionOutline = new Rect()
            .width((this.shape.width() as number) + this.selRectGapSize)
            .height((this.shape.height() as number)  + this.selRectGapSize)
            .stroke({ color: 'gray', width: 1, dasharray: '4,4' })
            .fill('none')
            .hide();
        this.group.add(this.selectionOutline);
        svg.add(this.group);

        this.movable = new GeneralMovable(this.shape)
        this.setDraggable('GENERAL');

        this.updateTextAndRectPosition();

        this.rect.on('click', () => this.startEditing());
        this.shape.on('click', () => this.toggleSelection())

        // TODO: extract in config
        this.constraint = new Box(0, 0, 1080, 720);
    }

    public move(x: number, y: number) {
        this.movable.move(x, y);
    }

    public setText(text: string) {
        this.textElement.plain(text)
    }

    public setConstraint(width: number, height: number): Elem {
        this.constraint = new Box(0, 0, width, height);

        return this;
    }

    public setMovable(movableType: MovableType): Elem {
        switch (movableType) {
            case 'CONSTRAINT':
                // TODO: extract in conig
                this.movable = new ConstraintMovable(this.shape, this.constraint, 3);
                break;
            case 'GENERAL':
                this.movable = new GeneralMovable(this.shape);
                break;
        }

        return this;
    }

    public setDraggable(draggableType: DraggableType): Elem {
        switch (draggableType) {
            case 'GENERAL':
                this.draggable = new GeneralDraggable();
                break;
        }

        this.draggable.init(this.group, this.movable);
        return this;
    }

    private toggleSelection() {
        if (!this.selectionOutline?.visible()) {
            this.selectionOutline?.show();
            this.draggable?.setDraggable(true); 

            document.addEventListener('click', this.handleDocumentClick);
        }
    }

    private handleDocumentClick = (event: MouseEvent) => {
        if (!this.group.node.contains(event.target as Node)) {
            this.selectionOutline?.hide();
            this.draggable?.setDraggable(false);
            document.removeEventListener('click', this.handleDocumentClick);
        }
    };

    private updateTextAndRectPosition() {
        const cx = this.shape.cx();
        const cy = this.shape.cy();
        this.textElement.cx(cx);
        this.textElement.cy(cy);
        this.rect.cx(cx).cy(cy);

        this.selectionOutline?.cx(cx).cy(cy);
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
            if (textarea.value != '') {
                this.textElement.text(textarea.value);
                this.updateTextAndRectPosition();
            }
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
