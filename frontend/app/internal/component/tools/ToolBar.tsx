import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box } from "@svgdotjs/svg.js";
import { SquarePlus } from "lucide-react";
import { ShapeType } from "~/internal/type/shape/ShapeType";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {ShapeConfig, shapeConfigs} from "~/internal/config/FigureConfigs"

interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

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
        new ShapeType(shape, svgContainer.svg, constraint);
    });

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
        </button> 
    </>)
}