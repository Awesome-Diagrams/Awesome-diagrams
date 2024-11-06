import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box, Circle} from "@svgdotjs/svg.js";
import { SquarePlus } from "lucide-react";
import { SvgShape } from "~/internal/svg/svgShape/svgShape";
import { GeneralDraggable } from "~/internal/svg/svgShape/draggable/GeneralDraggable";
import { ConstraintMovable } from "~/internal/svg/svgShape/movable/ConstraintMovable";
import { GeneralMovable } from "~/internal/svg/svgShape/movable/GeneralMovable";


interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

export const ToolBar = ({svgContainer}: DiagramProps) => {
    const clickHandler = updateSvg(svgContainer, svg => {
        const constraint = new Box(0, 0, 1080, 720)
        const shape = new Circle({r: 50, cx: 100, cy: 100});
        new SvgShape(shape, svg, new ConstraintMovable(shape, constraint)).setDraggable(new GeneralDraggable());
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