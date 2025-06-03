import { Ellipse, Rect, Shape, SVG, Circle, G, Line, Text} from "@svgdotjs/svg.js";
import { 
    CircleIcon, 
    Square, 
    RectangleHorizontal, 
    Triangle, LucideProps, 
    Unlink2,
    SquareCode,    // для UMLInterface
    Contact,       // для UMLActor
    PanelTop       // для UMLClass
} from "lucide-react";
import { ShapeType } from "~/model/DiagramSerialized";

export type ShapeConfig = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    createShape: () => Shape
    name: string
    type: ShapeType
}

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
];