import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box, Circle, Rect , Shape } from "@svgdotjs/svg.js";
import { SquarePlus, Circle as CircleIcon, Square, RectangleHorizontal, Triangle } from "lucide-react";
import { GeneralDraggable } from "~/internal/svg/svgShape/draggable/GeneralDraggable";
import { UseCaseShape } from "~/internal/svg/svgShape/shapes/UseCaseShape";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCallback, useState } from "react";

interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

type ShapeConfig = {
    name: string,
    createShape: () => Shape

}

const shapeConfigs: ShapeConfig[] = [
    {
        name: "Circle",
        //icon: CircleIcon,
        createShape: () => new Circle({ r: 50, cx: 100, cy: 100 }),
    },
    {
        name: "Square",
       // icon: Square,
        createShape: () => new Rect({ width: 90, height: 90, x: 100, y: 100 }),
    },
    {
        name: "Rectangle",
       // icon: RectangleHorizontal,
        createShape: () => new Rect({ width: 140, height: 90, x: 100, y: 100 }),
    },
];

export const ToolBar = ({ svgContainer }: DiagramProps) => {
    return (
        <div className="outline rounded-md ml-10">
            <div className="flex w-20 flex-col justify-center gap-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button title="Add Shape">
                            <SquarePlus />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        {shapeConfigs.map((config, idx) => (
                            <DropdownMenuItem key={idx}>
                                { /*<config.icon className="mr-2 h-4 w-4" /> */}
                                <ShapeDropDownMenu config={config} svgContainer={svgContainer!} />
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

interface ShapeDropDownMenuProps {
    config: ShapeConfig;
    svgContainer: SvgContainerHandle;
}

const ShapeDropDownMenu = ({config, svgContainer}: ShapeDropDownMenuProps) => {

    const clickHandler = updateSvg(svgContainer, () => {
        const constraint = new Box(0, 0, 1080, 720);
        const shape = config.createShape();
        new UseCaseShape(shape, svgContainer.svg, constraint);
    });

    return (<>
       <span className="w-full h-full" onClick={clickHandler}>{config.name}</span> 
    </>)
}