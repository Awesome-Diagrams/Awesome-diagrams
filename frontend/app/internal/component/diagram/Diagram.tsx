import { SvgContainerHandle } from "~/internal/svg/svgContainer/hook";
import { SvgContainer } from "~/internal/svg/svgContainer/SvgContainer";
import { Svg } from "@svgdotjs/svg.js";
import { SelectionController } from "../tools/SelectionController";

interface DiagramProps {
    setHandle: React.Dispatch<React.SetStateAction<SvgContainerHandle | undefined>>;
    setSelectionController: React.Dispatch<React.SetStateAction<SelectionController | undefined>>;
}

export const Diagram = ({ setHandle, setSelectionController }: DiagramProps) => {
    const height = 720;
    const width = 1080;

    const handleOnload = (svg: Svg) => {
        // Set svg dimensions 
        svg.size(width, height);

        // Инициализируем SelectionController и передаем его выше
        const selectionController = new SelectionController(svg);
        setSelectionController(selectionController);
    };

    return (
        <div className="outline rounded-md app">
            <SvgContainer
                setHandle={setHandle}
                width={width + "px"} 
                height={height + "px"} 
                margin='0 auto' 
                onload={handleOnload}
            />
        </div>
    );
}