import { Svg } from "@svgdotjs/svg.js";
import { UseCaseShape } from "~/internal/svg/svgShape/shapes/UseCaseShape";


export const selectedShapes: UseCaseShape[] = [];

export class SelectionController {
    private svg: Svg;

    constructor(svg: Svg) {
        this.svg = svg;

        // Обработчик кликов по пустой области
        this.svg.on('click', (e) => this.handleBackgroundClick(e as MouseEvent));
    }

    // Получить список выбранных фигур
    public getSelectedShapes(): UseCaseShape[] {
        return selectedShapes;
    }

    // Добавить фигуру в выбор
    public selectShape(shape: UseCaseShape): void {
        if (!selectedShapes.includes(shape)) {
            selectedShapes.push(shape);
            shape.select(); // Выделяем фигуру
        }
    }

    // Удалить фигуру из выбора
    public deselectShape(shape: UseCaseShape): void {
        const index = selectedShapes.indexOf(shape);
        if (index !== -1) {
            selectedShapes.splice(index, 1);
            shape.deselect(); // Снимаем выделение с фигуры
        }
    }

    // Снять выделение со всех фигур
    public clearSelection(): void {
        selectedShapes.forEach((shape) => shape.deselect());
        selectedShapes.length = 0;
        console.log('Cleared selection');
    }

    // Обработчик клика по пустой области
    private handleBackgroundClick(e: MouseEvent): void {
        const target = e.target as HTMLElement;

        // Если кликнули не по фигуре, снимаем выделение
        if (!target.closest('g')) {
            this.clearSelection();
        }
    }

    // Обработка множественного выделения
    public toggleShapeSelection(shape: UseCaseShape, shiftKey: boolean): void {
        if (shiftKey) {
            // Если Shift зажат, переключаем состояние выделения фигуры
            if (selectedShapes.includes(shape)) {
                this.deselectShape(shape);
            } else {
                this.selectShape(shape);
            }
        } else {
            // Если Shift не зажат, сбрасываем все выделения и выбираем текущую фигуру
            this.clearSelection();
            this.selectShape(shape);
        }
    }
}
