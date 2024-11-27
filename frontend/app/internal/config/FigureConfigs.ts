import { Circle, Rect , Shape, Ellipse, Polyline, SVG } from "@svgdotjs/svg.js";
import { Circle as CircleIcon, Square, RectangleHorizontal, Triangle, LucideProps, Unlink2 } from "lucide-react";
import { ShapeType } from "../../model/elem/ShapeType";

export type ShapeConfig = {
    shapeType: ShapeType,
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export const shapeConfigs: ShapeConfig[] = [
    {
        shapeType: 'CIRCLE',
        icon: CircleIcon,
    },
    {
        shapeType: 'SQUARE',
        icon: Square,
    },
    {
        shapeType: 'RECTANGLE',
        icon: RectangleHorizontal,
    },
    {
        shapeType: 'OVAL',
        icon: Unlink2,
    },
    {
        shapeType: 'TRIANGLE',
        icon: Triangle,
    },
];