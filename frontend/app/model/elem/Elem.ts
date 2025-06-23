import {
  Svg,
  Text,
  Rect,
  G,
  Shape,
  Box,
  Circle,
  Ellipse,
  SVG,
  Path,
  Line,
} from "@svgdotjs/svg.js";
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
import { ShapeSerialized, TextSerialized } from "../DiagramSerialized";
import { CustomConfig } from "./customs/CustomConfig";
import { ShapeType } from "../DiagramSerialized";
import SVGPathCommander, { ShapeTypes } from "svg-path-commander";
import paper from 'paper';
import { shapeToPath } from "~/internal/svg/path/utils";
import { UMLClassData } from "../DiagramSerialized";
import { Point } from "../Point";

export class Elem {
  private eventListeners: { [event: string]: ((...args: any[]) => void)[] } =
    {};

  // TODO: extract in constants
  private selRectGapSize: number = 20;

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
  private customConfig: CustomConfig;
  private shapetype: ShapeType;
  private widthShape: number;
  private heightShape: number;
  private color: string = "#000000";
  private umlData: UMLClassData;

  private textInfo: TextSerialized;

  constructor(svgGroup: G, private selectionController?: SelectionController) {
    // TODO: add to config
    // shape
    this.shape = new Circle({ r: 50, cx: 100, cy: 100 });
    this.customConfig = {
      fill: {
        color: "#000000",
        gradient: {
          enabled: true,
          secondColor: "#ff8000",
        },
      },
      opacity: 1,
    };
    this.shapetype = ShapeType.Circle;
    this.textInfo = {
      text: "",
      fontSize: 18,
      color: "#ffffff",
    };

    this.applyConfig();
    // svg
    this.svgGroup = svgGroup;

    // group
    this.group = new G();

    // text element
    this.textElement = new Text()
      .plain("")
      .font({ fill: "white", size: 16, anchor: "middle" });

    // rect
    this.rect = new Rect()
      .width(100)
      .height(30)
      .fill("transparent")
      .stroke({ color: "white", width: 1 })
      .opacity(0);

    // selection outline
    this.selectionOutline = new Rect()
      .stroke({ color: "gray", width: 1, dasharray: "4,4" })
      .fill("none")
      .hide();

    // TODO: extract in config
    // constraint
    this.constraint = new Box(0, 0, 1080, 720);

    // movable
    this.movable = new MultiMovable(this.selRectGapSize);

    // draggable
    this.setDraggable("DELTA");

    //scale
    this.heightShape = this.shape.height() as number;
    this.widthShape = this.shape.width() as number;
    this.umlData = {
          className: 'classname',
          attributes: [
          ],
          methods: [
              '+ methods(): void',
          ],
    }

    // TODO: fix it
    // configure
  }

  public remove(): void {
    this.group.remove();
  }

  public on(event: string, listener: (...args: any[]) => void): Elem {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);

    return this;
  }

  public off(event: string, listener: (...args: any[]) => void): void {
    this.eventListeners[event] = (this.eventListeners[event] || []).filter(
      (l) => l !== listener
    );
  }

  public trigger(event: string, ...args: any[]): void {
    (this.eventListeners[event] || []).forEach((listener) => listener(...args));
  }

  public move(x: number, y: number) {
    this.movable.move(x, y);
    console.log(this.getPath())
  }

  public setId(newId: string): Elem {
    this.shape.id(newId);

    return this;
  }

  public setRect(rect: Rect): Elem {
    this.rect = rect;

    return this;
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

  public getWidthShape(): number {
    return this.widthShape;
  }
  public getHeigthShape(): number {
    return this.heightShape;
  }

  public setWidth(width: number) {
    this.widthShape = width;
    if (
      this.shapetype === ShapeType.UMLClass ||
      this.shapetype === ShapeType.UMLInterface
    ) {
      return ;
    }
    else if (
      this.shapetype === ShapeType.Circle ||
      this.shapetype === ShapeType.Square
    ) {
      this.heightShape = width;
    }
    this.configureShapeSize();
  }

  public setHeigth(height: number) {
    this.heightShape = height;
    if (
      this.shapetype === ShapeType.UMLClass ||
      this.shapetype === ShapeType.UMLInterface
    ) {
      return ;
    }
    else if (
      this.shapetype === ShapeType.Circle ||
      this.shapetype === ShapeType.Square
    ) {
      this.widthShape = height;
    }
    this.configureShapeSize();
  }

  public setColor(color: string) {
    this.color = color;

    this.shape.fill(color);
    return this;
  }

  public getColor() {
    return this.color;
  }

  private configureShapeSize() {
    if (this.shape.type !== ShapeType.Line) {
      this.shape.size(this.widthShape, this.heightShape);
    }

    this.configureSelectionOutline();
    this.configureGroup();
  }

  public setCustomConfig(customConfig: CustomConfig): Elem {
    this.customConfig = customConfig;
    this.applyConfig();
    return this;
  }

  public getCustomConfig(): CustomConfig {
    return this.customConfig;
  }

  public applyConfig(): Elem {
    if (this.customConfig.stroke) {
      const strokeOptions: any = {};
      if (this.customConfig.stroke.color) {
        strokeOptions.color = this.customConfig.stroke.color;
      }
      if (typeof this.customConfig.stroke.width) {
        strokeOptions.width = this.customConfig.stroke.width;
      }
      if (this.customConfig.stroke.dasharray) {
        strokeOptions.dasharray = this.customConfig.stroke.dasharray;
      }
      this.shape.stroke(strokeOptions);
    }

    if (this.customConfig.fill) {
      this.shape.fill(this.customConfig.fill.color);
      // todo gradient
    }

    if (this.customConfig.opacity !== undefined) {
      this.shape.opacity(this.customConfig.opacity);
    }
    return this;
  }

  public setType(type: ShapeType): Elem {
    this.shapetype = type;
    return this;
  }

  public getType(): ShapeType {
    return this.shapetype;
  }

  public setShape(shape: Shape): Elem {
    if (this.group.has(this.shape)) {
      this.group.removeElement(this.shape);
    }
    this.shape = shape;
    this.heightShape = this.shape.height() as number;
    this.widthShape = this.shape.width() as number;

    return this;
  }

  public setShapeFromScratch(shape: ShapeSerialized): Elem {
    if (this.group.has(this.shape)) {
      this.group.removeElement(this.shape);
    }

    switch (shape.type) {
      case "circle":
        this.shape = new Circle({ r: shape.r, cx: shape.cx, cy: shape.cy });
        break;
      case "rect":
        this.shape = new Rect({
          width: shape.width,
          height: shape.height,
          x: shape.x,
          y: shape.y,
        });
        break;
      case "line":
        this.shape = new Line({ x1: shape.x, y1: shape.y, x2: shape.x2, y2: shape.y2 });
        break;
      case "square":
        this.shape = new Rect({
          width: shape.width,
          height: shape.height,
          x: shape.x,
          y: shape.y,
        });
        break;
      case "ellipse":
        this.shape = new Ellipse({
          cx: shape.cx,
          cy: shape.cy,
          rx: shape.rx,
          ry: shape.ry,
        });
        break;
      case "polyline":
        const sideLength = 100;
        const heightTri = (Math.sqrt(3) / 2) * sideLength;
        const x = shape.x + sideLength / 2;
        const y = shape.y;

        const points = [
          [x, y],
          [x - sideLength / 2, y + heightTri],
          [x + sideLength / 2, y + heightTri],
        ];

        const draw = SVG().addTo("body").size(300, 130);
        this.shape = draw.polygon(
          points.map((point) => point.join(",")).join(" ")
        ) as Shape;

        break;
      case "combined":
        this.shape = new Path().plot(shape.path!);
        break;
      case "uml_class":
        const originalX = shape.x;
        const originalY = shape.y;
        this.shape = this.createUMLClass(shape);
        console.log(shape.x, shape.y)

        const group = this.shape as G;
        group.move(originalX, originalY);
        break;
          
      case ShapeType.UMLInterface:
          this.shape = this.createUMLInterface(shape);
          break;
          
      case ShapeType.UMLActor:
          this.shape = this.createUMLActor(shape);
          break;
    }

    this.heightShape = this.shape.height() as number;
    this.widthShape = this.shape.width() as number;

    return this;
  }

// uml class -----------------------------------------------

  private createUMLClass(shape: ShapeSerialized): Shape {
    const baseWidth = shape.width || 200;
    const baseHeight = 120;
    
    const classGroup = new G();
    
    // Базовая фигура (без текста)
    const classRect = new Rect()
        .size(baseWidth, baseHeight)
        .fill('#ffffff')
        .stroke({ width: 2, color: '#000000' })
        .addClass('uml-main-rect')
        .addTo(classGroup);

    // Разделители
    const headerDivider = new Line()
        .stroke({ color: '#e0e0e0', width: 1 })
        .addTo(classGroup);
        

    const methodDivider = new Line()
        .stroke({ color: '#e0e0e0', width: 1 })
        .addTo(classGroup);

    classGroup.move(shape.x || 0, shape.y || 0);
    return classGroup as unknown as Shape;
  }

  //---------------------------------------------

  public getUMLClassData() {
    return {
      className: this.umlData?.className || "",
      attributes: this.umlData?.attributes || [],
      methods: this.umlData?.methods || []
    };
  }

  public setUMLClassData(data: UMLClassData): void {
    if (this.shapetype !== ShapeType.UMLClass) return;

    const group = this.shape as G;

    // Сохраняем текущую позицию группы перед изменениями
    const originalX = group.x();
    const originalY = group.y();
    
    group.find('text').forEach(t => t.remove());
    group.find('rect').forEach(t => t.remove());
    group.find('line').forEach(t => t.remove());

    // Конфигурация
    const textSize = 18;
    const lineHeight = textSize + 8;
    const xPadding = 15;
    const yPadding = 10;
    const headerHeight = 40;
    const minSectionHeight = 40;
    const defaultWidth = 200;

    // Рассчитываем высоту
    const attributesHeight = Math.max(
        minSectionHeight,
        data.attributes.length * lineHeight + yPadding * 2
    );
    const methodsHeight = Math.max(
        minSectionHeight,
        data.methods.length * lineHeight + yPadding * 2
    );
    const totalHeight = headerHeight + attributesHeight + methodsHeight;

    // Создаем основной прямоугольник
    const classRect = new Rect()
        .size(defaultWidth, totalHeight)
        .fill('#ffffff')
        .stroke({ width: 2, color: '#000000' })
        .addTo(group);

    // Разделительные линии
    const headerDivider = new Line()
        .plot([[0, headerHeight], [defaultWidth, headerHeight]])
        .stroke({ color: '#e0e0e0', width: 5 })
        .addTo(group);

    const methodDivider = new Line()
        .plot([[0, headerHeight + attributesHeight], [defaultWidth, headerHeight + attributesHeight]])
        .stroke({ color: '#e0e0e0', width: 5 })
        .addTo(group);

    // Добавляем текст с правильным позиционированием
    // Название класса (центрированное)
    new Text()
        .text(data.className)
        .attr({
            'font-size': textSize,
            'font-weight': 'bold',
            'text-anchor': 'middle',
            x: defaultWidth / 2,
            y: headerHeight / 2,
            'dominant-baseline': 'central'
        })
        .addTo(group);

    // Атрибуты
    data.attributes.forEach((attr, index) => {
        new Text()
            .text(attr)
            .attr({
                'font-size': textSize,
                x: xPadding,
                y: headerHeight + yPadding + index * lineHeight,
                'dominant-baseline': 'hanging'
            })
            .addTo(group);
    });

    // Методы
    data.methods.forEach((method, index) => {
        new Text()
            .text(method)
            .attr({
                'font-size': textSize,
                x: xPadding,
                y: headerHeight + attributesHeight + yPadding + index * lineHeight,
                'dominant-baseline': 'hanging'
            })
            .addTo(group);
    });

    // Восстанавливаем оригинальную позицию
    group.move(originalX, originalY);

    this.configureSelectionOutline();
    this.configureGroup();

    // Сохраняем новые данные
    this.umlData = data;
  }
// --------------
// uml interface

  private createUMLInterface(shape: ShapeSerialized): Shape {
    const baseWidth = shape.width || 200;
    const baseHeight = 120;
    
    const classGroup = new G();
    
    // Базовая фигура (без текста)
    const classRect = new Rect()
        .size(baseWidth, baseHeight)
        .fill('#ffffff')
        .stroke({ width: 2, color: '#000000' })
        .addClass('uml-main-rect')
        .addTo(classGroup);

    const methodDivider = new Line()
        .stroke({ color: '#e0e0e0', width: 1 })
        .addTo(classGroup);

    classGroup.move(shape.x || 0, shape.y || 0);
    return classGroup as unknown as Shape;
  }

  public getUMLInterfaceData() {
    return {
      className: this.umlData?.className || "",
      attributes: [],
      methods: this.umlData?.methods || []
    };
  }

// Получаем центр элемента
  public getCenter(): { x: number, y: number } {
      return {
          x: this.getGroup().cx() as number,
          y: this.getGroup().cy() as number
      };
  }

  // Получаем границы элемента (bounding box)
  public getBBox(): {
      x: number,
      y: number,
      width: number,
      height: number
  } {
      const node = this.getGroup().node as SVGGraphicsElement;
      const bbox = node.getBBox();
      return {
          x: bbox.x,
          y: bbox.y,
          width: bbox.width,
          height: bbox.height
      };
  }

// Получаем точку на стороне элемента
  public getSidePoint(side: 'top'|'right'|'bottom'|'left'): { x: number, y: number } {
      const bbox = this.getBBox();
      switch(side) {
          case 'top': return { x: bbox.x + bbox.width/2, y: bbox.y };
          case 'right': return { x: bbox.x + bbox.width, y: bbox.y + bbox.height/2 };
          case 'bottom': return { x: bbox.x + bbox.width/2, y: bbox.y + bbox.height };
          case 'left': return { x: bbox.x, y: bbox.y + bbox.height/2 };
          default: return { x: bbox.x, y: bbox.y };
      }
  }

  public setUMLInterfaceData(data: UMLClassData): void {
    if (this.shapetype !== ShapeType.UMLInterface) return;
    const group = this.shape as G;

    // Сохраняем текущую позицию группы перед изменениями
    const originalX = group.x();
    const originalY = group.y();
    
    group.find('text').forEach(t => t.remove());
    group.find('rect').forEach(t => t.remove());
    group.find('line').forEach(t => t.remove());

    // Конфигурация
    const textSize = 18;
    const lineHeight = textSize + 8;
    const xPadding = 15;
    const yPadding = 10;
    const headerHeight = 40;
    const minSectionHeight = 40;
    const defaultWidth = 200;

    const methodsHeight = Math.max(
        minSectionHeight,
        data.methods.length * lineHeight + yPadding * 2
    );
    const totalHeight = headerHeight + methodsHeight;

    // Создаем основной прямоугольник
    const classRect = new Rect()
        .size(defaultWidth, totalHeight)
        .fill('#ffffff')
        .stroke({ width: 2, color: '#000000' })
        .addTo(group);

    // Разделительные линии
    const headerDivider = new Line()
        .plot([[0, headerHeight], [defaultWidth, headerHeight]])
        .stroke({ color: '#e0e0e0', width: 5 })
        .addTo(group);

    // Добавляем текст с правильным позиционированием
    // Название класса (центрированное)
    new Text()
        .text(data.className)
        .attr({
            'font-size': textSize,
            'font-weight': 'bold',
            'text-anchor': 'middle',
            x: defaultWidth / 2,
            y: headerHeight / 2,
            'dominant-baseline': 'central'
        })
        .addTo(group);

    // Методы
    data.methods.forEach((method, index) => {
        new Text()
            .text(method)
            .attr({
                'font-size': textSize,
                x: xPadding,
                y: headerHeight + yPadding + index * lineHeight,
                'dominant-baseline': 'hanging'
            })
            .addTo(group);
    });

    // Восстанавливаем оригинальную позицию
    group.move(originalX, originalY);

    this.configureSelectionOutline();
    this.configureGroup();

    // Сохраняем новые данные
    this.umlData = data;
  }

// uml actor 

private createUMLActor(shape: ShapeSerialized): Shape {
    const size = 100; // Размер актора
    const group = new G();
    
    // Голова 
    new Circle({ r: size * 0.2, cx: size/2, cy: size * 0.25 })
        .fill('#ffffff')
        .stroke({ color: '#000000', width: 2 })
        .addTo(group);
    
    // Тело 
    new Line()
        .plot([
            [size/2, size * 0.45], 
            [size/2, size * 0.7]
        ])
        .stroke({ color: '#000000', width: 2 })
        .addTo(group);
    
    // Руки 
    new Line()
        .plot([
            [size * 0.2, size * 0.5], 
            [size * 0.8, size * 0.5]
        ])
        .stroke({ color: '#000000', width: 2 })
        .addTo(group);
    
    // Ноги 
    new Line()
        .plot([
            [size/2, size * 0.7], 
            [size * 0.3, size * 0.9]
        ])
        .stroke({ color: '#000000', width: 2 })
        .addTo(group);
        
    new Line()
        .plot([
            [size/2, size * 0.7], 
            [size * 0.7, size * 0.9]
        ])
        .stroke({ color: '#000000', width: 2 })
        .addTo(group);
    
    return group as unknown as Shape;
  }

//-----------------------------------  


  public setText(textInfo: TextSerialized): Elem {
    this.textInfo = textInfo;
    if (this.shapetype === "uml_class" || this.shapetype === "uml_interface") {
      return this;
    }
    else if (textInfo.text.trim() === "") {
      this.textElement.plain(textInfo.text);
    } else {
      this.textElement.text(textInfo.text);
      this.textElement.font({
        fill: textInfo.color,
        size: textInfo.fontSize,
        anchor: "middle",
      });
    }
    return this;
  }

  public setConstraint(box: Box): Elem {
    this.constraint = box;

    return this;
  }

  public setMovable(movableType: MovableType): Elem {
    switch (movableType) {
      case "CONSTRAINT":
        this.movable = new ConstraintMovable(
          this.group,
          this.constraint,
          this.selRectGapSize
        );
        break;
      case "GENERAL":
        this.movable = new GeneralMovable(this.group);
        break;
      case "MULTI":
        this.movable = new MultiMovable(this.selRectGapSize);
        break;
    }

    return this;
  }

  public setDraggable(draggableType: DraggableType): Elem {
    switch (draggableType) {
      case "GENERAL":
        this.draggable = new GeneralDraggable(this);
        break;
      case "DELTA":
        this.draggable = new DeltaDraggable(this);
        break;
    }

    return this;
  }

  public getShape() {
    return this.shape;
  }

  public getConstraint() {
    return this.constraint;
  }

  public getGroup() {
    return this.group;
  }

  public getRect() {
    return this.rect;
  }

  public getText(): TextSerialized {
    return this.textInfo;
  }

  public getSelectionOutline() {
    return this.selectionOutline;
  }

  public getIsSelected() {
    return this.isSelected;
  }

  public getDraggable() {
    return this.draggable;
  }

  public getMovable() {
    return this.movable;
  }

  public getPath(): string | undefined {
    if (this.shapetype !== "combined") {
      return undefined;
    }
    const path = (this.shape as Path).node.getAttribute('d')!;
    return path;
  }

  public getX1() {
    if (this.shapetype !== ShapeType.Line) {
      throw new Error();
    }
    return (this.shape as Line).plot()[0][0];
  }
  
  public getY1() {
    if (this.shapetype !== ShapeType.Line) {
      throw new Error();
    }
    return (this.shape as Line).plot()[0][1];  
  }

  public getX2() {
    if (this.shapetype !== ShapeType.Line) {
      throw new Error();
    }
    return (this.shape as Line).plot()[1][0];
  }
  
  public getY2() {
    if (this.shapetype !== ShapeType.Line) {
      throw new Error();
    }
    return (this.shape as Line).plot()[1][1];
  }

  public setPoints(x1: number, y1: number, x2: number, y2: number) {
    if (this.shapetype !== ShapeType.Line) {
      throw new Error();
    } 
    (this.shape as Line).plot([[x1, y1], [x2, y2]]);
    this.configureShapeSize();
  }

  private configureSelectionOutline() {
    this.selectionOutline
      .width((this.shape.width() as number) + this.selRectGapSize)
      .height((this.shape.height() as number) + this.selRectGapSize);
  }

  private configureEvent() {
    this.rect.off("click");
    this.rect.on("click", () => this.startEditing());
    this.shape.off("click");
    this.shape.on("click", (e) => this.toggleSelect(e as MouseEvent));
  }

  private configureGroup() {
    this.group.cx(this.shape.cx()).cy(this.shape.cy());
    if (!this.group.has(this.shape)) {
      this.group.add(this.shape);
    }

    this.textElement.cx(this.shape.cx()).cy(this.shape.cy());
    if (!this.group.has(this.textElement)) {
      this.group.add(this.textElement);
    }

    this.rect.cx(this.shape.cx()).cy(this.shape.cy());
    if (!this.group.has(this.rect)) {
      this.group.add(this.rect);
    }

    this.selectionOutline.cx(this.shape.cx()).cy(this.shape.cy());
    if (!this.group.has(this.selectionOutline)) {
      this.group.add(this.selectionOutline);
    }

    this.svgGroup.add(this.group);
  }

  public configureAll() {
    this.configureSelectionOutline();
    this.configureGroup();
    this.configureEvent();
    this.applyConfig();
  }

  public excludeElement(other: Elem) {
    this.shapetype = ShapeType.Combined;
    paper.setup(new paper.Size(400, 400));

    const fill = this.shape.fill();

    const pathBool = new paper.Path(
      shapeToPath(this.shape)
    );
    const otherPathBool = new paper.Path(
      shapeToPath(other.shape)
    );

    const result = pathBool.subtract(otherPathBool).exportSVG({ asString: false }) as SVGElement;

    const newShape = SVG(result);

    this.setShape(newShape);
    this.configureAll();
    this.setColor(fill);
  }

  public combineElement(other: Elem) {
    this.shapetype = ShapeType.Combined;
    paper.setup(new paper.Size(400, 400));

    const fill = this.shape.fill();

    const pathBool = new paper.Path(
      shapeToPath(this.shape)
    );
    const otherPathBool = new paper.Path(
      shapeToPath(other.shape)
    );
    console.error(shapeToPath(this.shape));
    console.error(shapeToPath(other.shape));

    const result = pathBool.unite(otherPathBool).exportSVG({ asString: false }) as SVGElement;
    console.error(result.getAttribute('d'));

    const newShape = SVG(result);

    this.setShape(newShape);
    this.configureAll();
    this.setColor(fill);
  }

  private startEditing() {
    const prevText = this.textElement.text();

    const textarea = document.createElement("textarea");
    textarea.value = this.textElement.text();
    textarea.style.position = "absolute";

    const { left, top, width, height } =
      this.group.node.getBoundingClientRect();
    textarea.style.left = `${left + width / 2}px`;
    textarea.style.top = `${top + height / 2}px`;
    textarea.style.transform = "translate(-50%, -50%)";
    textarea.style.fontSize = "16px";
    textarea.style.padding = "4px";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.addEventListener("blur", () => {
      if (textarea.value.trim() === "") {
        this.textElement.plain(textarea.value);
      } else {
        this.textElement.text(textarea.value);
      }
      textarea.remove();
    });
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        textarea.value = prevText;
        textarea.blur();
      }
    });
  }
}