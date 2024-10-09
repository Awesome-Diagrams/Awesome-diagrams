import { SvgContainerHandle } from "~/internal/svgContainer/hook";
import { SvgContainer } from "~/internal/svgContainer/SvgContainer";
import { Svg } from "@svgdotjs/svg.js";

interface DiagramProps {
    setHandle: React.Dispatch<React.SetStateAction<SvgContainerHandle | undefined>>;
}

export const Diagram = ({setHandle}: DiagramProps) => {
    const height = 720;
    const width = 1080;

    const handleOnload = (svg: Svg) => {
        // Set svg dimensions 
        svg.size(width, height);
    }

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