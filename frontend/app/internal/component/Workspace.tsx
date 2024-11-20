import { ToolBar } from "./tools/ToolBar"
import { Diagram } from "./diagram/Diagram"
import { updateSvg, useSvgContainer } from "../svg/svgContainer/hook";
import { ImportCard } from "./tools/file/ImportCard";
import { useCallback } from "react";
import { ExportCard } from "./tools/file/ExportCard";

export const Workspace = () => {
    const { setHandle, svgContainer } = useSvgContainer();

    return (
        <div className="flex flex-row grow justify-start">
            <div className="flex basis-1/4">
                <ImportCard svgContainer={svgContainer} />
                <ExportCard svgContainer={svgContainer} />
                <ToolBar svgContainer={svgContainer}/>
            </div>
            <div className="flex basis-3/4 justify-center">
                <Diagram  setHandle={setHandle} />
            </div>
        </div>
    )
}