import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box, Circle} from "@svgdotjs/svg.js";
import { SvgShapeDraggable } from "~/internal/svg/svgShape/svgShapeDraggable";
import { SquarePlus } from "lucide-react";

interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

export const ToolBar = ({svgContainer}: DiagramProps) => {
    const clickHandler = updateSvg(svgContainer, svg => {
        const constraints = new Box(0, 0, 1080, 720)
        const shape = new Circle({r: 50, cx: 100, cy: 100});
        new SvgShapeDraggable(shape, svg, constraints);
    })

    return (
        <div className="outline rounded-md ml-10">
            <div className="flex w-20 flex-col justify-center gap-10">
                <Button onClick={clickHandler} title="add shape">
                    <SquarePlus />
                </Button>
            </div>
        </div>
    )
}