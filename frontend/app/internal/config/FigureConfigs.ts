import { Circle, Rect , Shape, Ellipse, Polyline, SVG } from "@svgdotjs/svg.js";
import { Circle as CircleIcon, Square, RectangleHorizontal, Triangle, LucideProps, Unlink2 } from "lucide-react";

export type ShapeConfig = {
    name: string,
    createShape: () => Shape
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export const shapeConfigs: ShapeConfig[] = [
    {
        name: "Circle",
        icon: CircleIcon,
        createShape: () => new Circle({ r: 50, cx: 100, cy: 100 }),
    },
    {
        name: "Square",
        icon: Square,
        createShape: () => new Rect({ width: 90, height: 90, x: 100, y: 100 }),
    },
    {
        name: "Rectangle",
        icon: RectangleHorizontal,
        createShape: () => new Rect({ width: 140, height: 90, x: 100, y: 100 }),
    },
    {
        name: "Oval",
        icon: Unlink2,
        createShape: () => new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 }),
    },
    {
        name: "Triangle",
        icon: Triangle,
        createShape: () => {
            const sideLength = 100;
            const height = (Math.sqrt(3) / 2) * sideLength;
            const x = 100;
            const y = 100;
            const points = `${x},${y} ${x - sideLength / 2},${y + height} ${x + sideLength / 2},${y + height}`;
            const draw = SVG().addTo('body').size(300, 130);
            return draw.polyline(points) as Shape;
        },
    },
];