import { Svg, Text, Rect, G, Shape, Box, Circle } from "@svgdotjs/svg.js";
import { Draggable } from "./draggable/Draggable";
import { Movable } from "./movable/Movable";
import { ConstraintMovable } from "./movable/ConstraintMovable";
import { GeneralDraggable } from "./draggable/GeneralDraggable";
import { GeneralMovable } from "./movable/GeneralMovable";
import { MovableType } from "./movable/MovableType";
import { DraggableType } from "./draggable/DraggableType";
import { SelectionController } from "~/components/tools/SelectionController";
import { DeltaDraggable } from "./draggable/DeltaDraggable";
import { MultiMovable } from "./movable/MultiMovable";

export class Elem {

    // TODO: extract in constants
    private selRectGapSize : number = 20;

    private draggable?: Draggable;
    private movable: Movable;
    private isSelected: boolean = false;

    // svg
    private svgGroup: G;
    private selectionOutline: Rect; 
    private group: G;
    private shape: Shape;
    private textElement: Text;
    private rect: Rect;
    private constraint: Box;

    constructor(svgGroup: G, private selectionController?: SelectionController) {

        // TODO: add to config
        // shape
        this.shape = new Circle({ r: 50, cx: 100, cy: 100 });

        // svg
        this.svgGroup = svgGroup;

        // group
        this.group = new G();

        // text element
        this.textElement = new Text()
            .plain('')
            .font({ fill: 'white', size: 16, anchor: 'middle' })

        // rect
        this.rect = new Rect()
            .width(100)
            .height(30)
            .fill('transparent')
            .stroke({ color: 'white', width: 1 })
            .opacity(0)

        // selection outline
        this.selectionOutline = new Rect()
            .stroke({ color: 'gray', width: 1, dasharray: '4,4' })
            .fill('none')
            .hide()

        // TODO: extract in config
        // constraint
        this.constraint = new Box(0, 0, 1080, 720);

        // movable
        this.movable = new MultiMovable(this.constraint, this.selRectGapSize);
        
        // draggable
        this.setDraggable('DELTA');
        
        // TODO: fix it
        // configure
        // this.configureAll()
    }

    public move(x: number, y: number) {
        this.movable.move(x, y);
    }

    public setId(newId : string) : Elem { 
        this.shape.id(newId);

        return this;
    }

    public setRect(rect: Rect): Elem {
        this.rect = rect

        this.configureAll()

        return this
    }

    public getX(): number {
        return this.group.x() as number;
    }

    public getY(): number {
        return this.group.y() as number;
    }

    private toggleSelect(event: MouseEvent): void {
        event.stopPropagation();

        this.selectionController?.toggleShapeSelection(this, event.shiftKey);
    }

    public select(): void {
        if (!this.selectionOutline?.visible()) {
            this.selectionOutline?.show();
            this.draggable?.setDraggable(true);
            this.isSelected = true;
        }
    }

    public deselect(): void {
        this.selectionOutline?.hide();
        this.draggable?.setDraggable(false);
        this.isSelected = false;
    }

    // TODO: remove
    public setGroup(group: G): Elem {
        this.group = group

        this.configureAll()

        return this
    }

    public setShape(shape: Shape): Elem {
        if (this.group.has(this.shape)) {
            this.group.removeElement(this.shape)
        }
        this.shape = shape

        this.configureAll()

        return this
    }

    public setText(textElem: Text): Elem {
        this.textElement = textElem

        this.configureAll()

        return this
    }

    public setConstraint(box: Box): Elem {
        this.constraint = box;

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
            case 'MULTI':
                this.movable = new MultiMovable(this.constraint, this.selRectGapSize);
                break;
        }

        return this;
    }

    public setDraggable(draggableType: DraggableType): Elem {
        switch (draggableType) {
            case 'GENERAL':
                this.draggable = new GeneralDraggable();
                break;
            case 'DELTA':
                this.draggable = new DeltaDraggable();
                break;
        }

        this.draggable.configure(this);

        return this;
    }

    public getShape() {
        return this.shape
    }

    public getConstraint() {
        return this.constraint
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

    private configureSelectionOutline() {
        this.selectionOutline
            .width((this.shape.width() as number) + this.selRectGapSize)
            .height((this.shape.height() as number)  + this.selRectGapSize)
    }

    private configureEvent() {
        this.rect.on('click', () => this.startEditing());
        this.shape.on('click', (e) => this.toggleSelect(e as MouseEvent))
    }

    private configureGroup() {
        this.group.cx(this.shape.cx()).cy(this.shape.cy()) 
        if (!this.group.has(this.shape)) {
            this.group.add(this.shape)
        }

        this.textElement.cx(this.shape.cx()).cy(this.shape.cy())
        if (!this.group.has(this.textElement)) {
            this.group.add(this.textElement);
        }

        this.rect.cx(this.shape.cx()).cy(this.shape.cy())
        if (!this.group.has(this.rect)) {
            this.group.add(this.rect);
        }
        
        this.selectionOutline.cx(this.group.cx()).cy(this.group.cy());
        if (!this.group.has(this.selectionOutline)) {
            this.group.add(this.selectionOutline)
        }

        this.svgGroup.add(this.group);
    }

    private configureAll() {
        this.configureSelectionOutline()
        this.configureGroup()
        this.configureEvent()
        this.draggable?.configure(this)
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
