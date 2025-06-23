import { Ellipse, Rect, Shape, SVG, Circle, G, Line, Text} from "@svgdotjs/svg.js";
import { 
    CircleIcon, 
    Square, 
    RectangleHorizontal, 
    Triangle, LucideProps, 
    Unlink2,
    SquareCode,    // для UMLInterface
    Contact,       // для UMLActor
    PanelTop,       // для UMLClass
    Minus
} from "lucide-react";
import { ShapeType } from "~/model/DiagramSerialized";
import { CustomConfig } from "~/model/elem/customs/CustomConfig";

export type ShapeConfig = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    createShape: () => Shape
    name: string
    type: ShapeType
    config?: CustomConfig,
}

const ghostStyle: CustomConfig = {
    fill: {
        color: "#fff",
    },
    stroke: {
        color: "#000",
        width: 1,
    },
};

export const shapeConfigs: ShapeConfig[] = [
    {
        createShape: () => new Circle({ r: 50, cx: 100, cy: 100 }),
        icon: CircleIcon,
        name: 'Circle',
        type: ShapeType.Circle,
    },
    {
        createShape: () => new Rect({ width: 90, height: 90, x: 100, y: 100 }),
        icon: Square,
        name: 'Square',
        type: ShapeType.Square
    },
    {
        createShape: () => new Rect({ width: 140, height: 90, x: 100, y: 100 }),
        icon: RectangleHorizontal,
        name: 'Rectangle',
        type: ShapeType.Rect
    },
    {
        createShape: () => new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 }),
        icon: Unlink2,
        name: 'Ellipse',
        type: ShapeType.Ellipse
    },
    {
        createShape: () => {
            const sideLength = 100;
            const height = (Math.sqrt(3) / 2) * sideLength;
            const x = 100;
            const y = 100;
            const points = [
                [x, y], 
                [x - sideLength / 2, y + height], 
                [x + sideLength / 2, y + height]
            ];
        
            const draw = SVG().addTo('body').size(300, 130);
        
            return draw.polygon(points.map(point => point.join(',')).join(' ')) as Shape;
        },
        
        icon: Triangle,
        name: 'Triangle',
        type: ShapeType.Polyline
    },
    {
    createShape: () => {
            const draw = SVG().addTo('body').size(300, 130);
            return draw.line(50, 50, 150, 150).stroke({ width: 2, color: '#000' });
        },
        icon: Minus,
        name: 'Line',
        type: ShapeType.Line,
    },
        {
    createShape: () => new Circle({ r: 50, cx: 100, cy: 100 }),
        icon: CircleIcon,
        name: 'Ghost circle',
        type: ShapeType.Circle,
        config: ghostStyle,
    },
    {
    createShape: () => new Rect({ width: 90, height: 90, x: 100, y: 100 }).attr(ghostStyle),
        icon: Square,
        name: 'Ghost square',
        type: ShapeType.Square,
        config: ghostStyle,
    },
    {
    createShape: () => new Rect({ width: 140, height: 90, x: 100, y: 100 }).attr(ghostStyle),
        icon: RectangleHorizontal,
        name: 'Ghost rectangle',
        type: ShapeType.Rect,
        config: ghostStyle,
    },
    {
    createShape: () => new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 }).attr(ghostStyle),
        icon: Unlink2,
        name: 'Ghost ellipse',
        type: ShapeType.Ellipse,
        config: ghostStyle,
    },
    {
    createShape: () => {
            const sideLength = 100;
            const height = (Math.sqrt(3) / 2) * sideLength;
            const x = 100;
            const y = 100;
            const points = [
                [x, y], 
                [x - sideLength / 2, y + height], 
                [x + sideLength / 2, y + height]
            ];
        
            const draw = SVG().addTo('body').size(300, 130);
        
            return (draw.polygon(points.map(point => point.join(',')).join(' ')) as Shape).attr(ghostStyle);
        },
        
        icon: Triangle,
        name: 'Ghost triangle',
        type: ShapeType.Polyline,
        config: ghostStyle,
    },
    {
    createShape: () => {
            const width = 140;
            const height = 100;
            const group = new G();
            
            // Основной прямоугольник
            const rect = new Rect({ width, height, x: 30, y: 30 })
                .fill('#ffffff')
                .stroke({ color: '#000000', width: 2 });
            
            // Разделительные линии
            const divider1 = new Rect({ width, height: 2, x: 30, y: 60 })
                .fill('#000000');
                
            const divider2 = new Rect({ width, height: 2, x: 30, y: 90 })
                .fill('#000000');
            
            group.add(rect);
            group.add(divider1);
            group.add(divider2);
            
            return group as unknown as Shape;
        },
        icon: PanelTop,
        name: 'UML Class',
        type: ShapeType.UMLClass
    },
    {
        createShape: () => {
            const width = 140;
            const height = 100;
            const group = new G();
            
            // Основной прямоугольник
            const rect = new Rect({ width, height, x: 30, y: 30 })
                .fill('#ffffff')
                .stroke({ color: '#000000', width: 2 });
            
            // Разделительные линии
            const divider1 = new Rect({ width, height: 2, x: 30, y: 60 })
                .fill('#000000');
                
            
            group.add(rect);
            group.add(divider1);
            
            return group as unknown as Shape;
        },
        icon: SquareCode,
        name: 'UML Interface',
        type: ShapeType.UMLInterface
    },
    {
    createShape: () => {
        const size = 100; // Размер актора
        const group = new G();
        
        // Голова (круг)
        new Circle({ r: size * 0.2, cx: size/2, cy: size * 0.25 })
            .fill('#ffffff')
            .stroke({ color: '#000000', width: 2 })
            .addTo(group);
        
        // Тело (линия)
        new Line()
            .plot([
                [size/2, size * 0.45], 
                [size/2, size * 0.7]
            ])
            .stroke({ color: '#000000', width: 2 })
            .addTo(group);
        
        // Руки (линия)
        new Line()
            .plot([
                [size * 0.2, size * 0.5], 
                [size * 0.8, size * 0.5]
            ])
            .stroke({ color: '#000000', width: 2 })
            .addTo(group);
        
        // Ноги (линии)
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
    },
    icon: Contact,
    name: 'UML Actor',
    type: ShapeType.UMLActor
}
];