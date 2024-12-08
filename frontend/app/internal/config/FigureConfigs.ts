import { Ellipse, Rect, Shape, SVG, Circle } from "@svgdotjs/svg.js";
import { CircleIcon, Square, RectangleHorizontal, Triangle, LucideProps, Unlink2 } from "lucide-react";

export type ShapeConfig = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    createShape: () => Shape
    name: string
}

export const shapeConfigs: ShapeConfig[] = [
    {
        createShape: () => new Circle({ r: 50, cx: 100, cy: 100 }),
        icon: CircleIcon,
        name: 'Circle',
    },
    {
        createShape: () => new Rect({ width: 90, height: 90, x: 100, y: 100 }),
        icon: Square,
        name: 'Square',
    },
    {
        createShape: () => new Rect({ width: 140, height: 90, x: 100, y: 100 }),
        icon: RectangleHorizontal,
        name: 'Rectangle',
    },
    {
        createShape: () => new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 }),
        icon: Unlink2,
        name: 'Ellipse',
    },
    {
        createShape: () => {
            const sideLength = 100;
            const height = (Math.sqrt(3) / 2) * sideLength;
            const x = 100;
            const y = 100;
            const points = `${x},${y} ${x - sideLength / 2},${y + height} ${x + sideLength / 2},${y + height}`;
            const draw = SVG().addTo('body').size(300, 130);
            return draw.polyline(points) as Shape;
        },
        icon: Triangle,
        name: 'Triangle',
    },
];