import { useSvgContainer, updateSvg } from "../svgContainer/hook";
import { SvgContainer } from "../svgContainer/SvgContainer";
import { Svg } from "@svgdotjs/svg.js";

export const Diagram = () => {
    const { setHandle, svgContainer } = useSvgContainer();

    const handleOnload = (svg: Svg) => {
        // Set svg dimensions 
        svg.size(300, 300);
    }

    const clickHandler = updateSvg(svgContainer, svg => {
        const circle = svg.circle(100);

        circle.on('click', () => {
            circle.move(Math.floor(Math.random() * 50), Math.floor(Math.random() * 50));
        })
    })

    return (
        <div className="app">
            <SvgContainer setHandle={setHandle} width='300px' height='300px' margin='0 auto' onload={handleOnload}/>
            <button onClick={clickHandler}>Add new shape</button>
        </div>
    );
}