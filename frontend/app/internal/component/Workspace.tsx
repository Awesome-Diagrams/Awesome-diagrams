import { ToolBar } from "./tools/ToolBar"
import { Diagram } from "./diagram/Diagram"
import { useSvgContainer } from "../svg/svgContainer/hook";

export const Workspace = () => {
    const { setHandle, svgContainer } = useSvgContainer();

    return (
        <div className="flex flex-row grow justify-start">
            <div className="flex basis-1/4">
                <ToolBar svgContainer={svgContainer}/>
            </div>
            <div className="flex basis-3/4 justify-center">
                <Diagram  setHandle={setHandle} />
            </div>
        </div>
    )
}