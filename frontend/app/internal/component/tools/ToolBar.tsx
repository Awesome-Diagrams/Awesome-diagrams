import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box } from "@svgdotjs/svg.js";
import { SquarePlus } from "lucide-react";
import { GeneralDraggable } from "~/internal/svg/svgShape/draggable/GeneralDraggable";
import { UseCaseShape } from "~/internal/svg/svgShape/shapes/UseCaseShape";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ShapeConfig, shapeConfigs } from "~/internal/svg/diagramShapes/SvgFigureConfigs";
import { SelectionController } from "./SelectionController";

interface ToolBarProps {
    svgContainer: SvgContainerHandle | undefined;
    selectionController: SelectionController | undefined;
}

export const ToolBar = ({ svgContainer, selectionController }: ToolBarProps) => {
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
                                <ShapeDropDownMenu
                                    config={config}
                                    svgContainer={svgContainer!}
                                    selectionController={selectionController!}
                                />
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
    selectionController: SelectionController;
}

const ShapeDropDownMenu = ({ config, svgContainer, selectionController }: ShapeDropDownMenuProps) => {
    const clickHandler = updateSvg(svgContainer, () => {
        const constraint = new Box(0, 0, 1080, 720);
        const shape = config.createShape();
        new UseCaseShape(shape, svgContainer.svg, constraint, selectionController);
    });

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
        </button> 
    </>)
}