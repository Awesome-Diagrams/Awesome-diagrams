import { Svg, Text, Rect, G, Shape, Box } from "@svgdotjs/svg.js";
import { Draggable } from "../draggable/Draggable";
import { Movable } from "../movable/Movable";
import { DeltaDraggable } from "../draggable/DeltaDraggable";
import { MultiMovable } from "../movable/MultiMovable";

export const selectedShapes: UseCaseShape[] = [];

export class UseCaseShape {
    private selRectGapSize: number = 20;

    private draggable?: Draggable;
    public group: G;
    private shape: Shape;
    private textElement: Text;
    private rect: Rect;
    private svg: Svg;
    private movable: Movable;
    private isSelected: boolean = false;
    private selectionOutline?: Rect;

    constructor(shape: Shape, svg: Svg, constraint: Box) {
        this.shape = shape;
        this.svg = svg;

        this.group = new G();
        this.group.add(this.shape);

        this.textElement = new Text().plain('').font({ fill: 'white', size: 16, anchor: 'middle' });
        this.group.add(this.textElement);

        this.rect = new Rect().width(100).height(30).fill('transparent').stroke({ color: 'white', width: 1 }).opacity(0);
        this.group.add(this.rect);

        this.selectionOutline = new Rect()
            .width((this.shape.width() as number) + this.selRectGapSize)
            .height((this.shape.height() as number) + this.selRectGapSize)
            .stroke({ color: 'gray', width: 1, dasharray: '4,4' })
            .fill('none')
            .hide();
        this.group.add(this.selectionOutline);

        svg.add(this.group);
        this.movable = new MultiMovable(constraint, this.selRectGapSize);
        this.setDraggable(new DeltaDraggable());

        this.updateTextAndRectPosition();

        this.rect.on('click', () => this.startEditing());
        this.shape.on('click', (e) => this.toggleSelection(e as MouseEvent));

        this.addDeselectHandler(svg);
    }

    public getX(): number {
        return this.group.x() as number;
    }

    public getY(): number {
        return this.group.y() as number;
    }

    private toggleSelection(event: MouseEvent) {
        event.stopPropagation();

        if (event.shiftKey) {
            if (this.isSelected) {
                this.deselect();
                const index = selectedShapes.indexOf(this);
                if (index > -1) selectedShapes.splice(index, 1);
            } else {
                this.select();
                selectedShapes.push(this);
            }
        } else {
            // Сбрасываем выделение остальных фигур
            selectedShapes.forEach((shape) => shape.deselect());
            selectedShapes.length = 0;

            this.select();
            selectedShapes.push(this);
        }

        console.log('Selected shapes:', selectedShapes.length);
    }

    private handleDocumentClick = (event: MouseEvent) => {
        if (!this.group.node.contains(event.target as Node)) {
            this.selectionOutline?.hide();
            this.draggable?.setDraggable(false);
            document.removeEventListener('click', this.handleDocumentClick);
        }
    };

    private select() {
        if (!this.selectionOutline?.visible()) {
            this.selectionOutline?.show();
            this.draggable?.setDraggable(true);
            this.isSelected = true;
        }
    }

    private deselect() {
        this.selectionOutline?.hide();
        this.draggable?.setDraggable(false);
        this.isSelected = false;
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

    private addDeselectHandler(svg: Svg) {
        svg.on('click', (e: Event) => {
            const target = e.target as HTMLElement;
            if (selectedShapes.length > 0 && (!target || !target.closest('g'))) {
                selectedShapes.forEach((shape) => shape.deselect());
                selectedShapes.length = 0;
            }
        });
    }

}
