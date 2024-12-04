import { ToolBar } from "./tools/ToolBar"
import { Diagram } from "./diagram/Diagram"
import { useSvgContainer } from "../svg/svgContainer/hook";
import { useState } from "react";
import { SelectionController } from "./tools/SelectionController";

export const Workspace = () => {
    const { setHandle, svgContainer } = useSvgContainer();
    const [selectionController, setSelectionController] = useState<SelectionController | undefined>();

    return (
        <div className="flex flex-row grow justify-start">
            <div className="flex basis-1/4">
                <ToolBar svgContainer={svgContainer} selectionController={selectionController} />
            </div>
            <div className="flex basis-3/4 justify-center">
                <Diagram setHandle={setHandle} setSelectionController={setSelectionController} />
            </div>
        </div>
    )
}