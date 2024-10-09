import { SquarePlus } from "lucide-react";
import { SvgContainerHandle, updateSvg } from "~/internal/svgContainer/hook";
import { Button } from "~/components/ui/button";

interface DiagramProps {
    svgContainer: SvgContainerHandle | undefined;
}

export const ToolBar = ({svgContainer}: DiagramProps) => {
    const clickHandler = updateSvg(svgContainer, svg => {
        const circle = svg.circle(100);

        circle.on('click', () => {
            circle.move(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100));
        })
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