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

        this.group = new G().cx(this.shape.cx()).cy(this.shape.cy());
        this.group.add(this.shape);

        this.textElement = new Text().plain('')
                           .font({ fill: 'white', size: 16, anchor: 'middle' })
                           .cx(this.group.cx()).cy(this.group.cy());
        this.group.add(this.textElement);

        this.rect = new Rect().width(100).height(30)
                    .fill('transparent')
                    .stroke({ color: 'white', width: 1 })
                    .opacity(0)
                    .cx(this.group.cx())
                    .cy(this.group.cy());
        this.group.add(this.rect);

        this.selectionOutline = new Rect()
            .width((this.shape.width() as number) + this.selRectGapSize)
            .height((this.shape.height() as number)  + this.selRectGapSize)
            .stroke({ color: 'gray', width: 1, dasharray: '4,4' })
            .fill('none')
            .hide()
            .cx(this.group.cx())
            .cy(this.group.cy());
        this.group.add(this.selectionOutline);

        this.svg.add(this.group);
        this.movable = new GeneralMovable(this.group);
        this.setDraggable('GENERAL');

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
                this.movable = new ConstraintMovable(this.group, this.constraint, this.selRectGapSize);
                break;
            case 'GENERAL':
                this.movable = new GeneralMovable(this.group);
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

        this.draggable.init(this);
        return this;
    }

    public getShape() {
        return this.shape
    }

    public getGroup() {
        return this.group
    }

    public getRect() {
        return this.rect
    }

    public getTextElement(): Text {
        return this.textElement
    }

    public getSelectionOutline() {
        return this.selectionOutline
    }

    public getIsSelected() {
        return this.isSelected
    }

    public getDraggable() {
        return this.draggable
    }

    public getMovable() {
        return this.movable
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
            if (textarea.value.trim() === '') {
                this.textElement.plain(textarea.value);
            } else {
                this.textElement.text(textarea.value);
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
