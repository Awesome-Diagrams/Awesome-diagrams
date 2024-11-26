import { Svg, Text, Rect, G, Circle, Shape, Box } from "@svgdotjs/svg.js";
import { Draggable } from "../draggable/Draggable";
import { Movable } from "../movable/Movable";
import { ConstraintMovable } from "../movable/ConstraintMovable";
import { GeneralDraggable } from "../draggable/GeneralDraggable";

export class UseCaseShape {
    private selRectGapSize : number = 20;

    private draggable?: Draggable;
    private group: G;
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

        this.group = new G().cx(this.shape.cx()).cy(this.shape.cy());
        this.group.add(this.shape);

        this.textElement = new Text().plain('')
                           .font({ fill: 'white', size: 16, anchor: 'middle' })
                           .cx(this.group.cx()).cy(this.group.cy());
        this.group.add(this.textElement);

        this.rect = new Rect().width(100).height(30)
                    .fill('transparent')
                    .stroke({ color: 'white', width: 1 })
                    .opacity(0).cx(this.group.cx()).cy(this.group.cy());
        this.group.add(this.rect);

        this.selectionOutline = new Rect()
            .width((this.shape.width() as number) + this.selRectGapSize)
            .height((this.shape.height() as number)  + this.selRectGapSize)
            .stroke({ color: 'gray', width: 1, dasharray: '4,4' })
            .fill('none')
            .hide().cx(this.group.cx()).cy(this.group.cy());
        this.group.add(this.selectionOutline);

        svg.add(this.group);
        this.movable = new ConstraintMovable(this.group, constraint, this.selRectGapSize);
        this.setDraggable(new GeneralDraggable());

        this.rect.on('click', () => this.startEditing());
        this.shape.on('click', () => this.toggleSelection())
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

    public setDraggable(draggable: Draggable): UseCaseShape {
        this.draggable = draggable;
        this.draggable.init(this.group, this.movable);
        return this;
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
