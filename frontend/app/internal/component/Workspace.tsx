import { ToolBar } from "./tools/ToolBar"
import { Diagram } from "./diagram/Diagram"
import { ImportCard } from "./tools/file/ImportCard";
import { ExportCard } from "./tools/file/ExportCard";

export const Workspace = () => {

    return (
        <div className="flex flex-row grow justify-start">
            <div className="flex basis-1/4">
                <ImportCard />
                <ExportCard />
                <ToolBar svgContainer={svgContainer}/>
            </div>
            <div className="flex basis-3/4 justify-center">
                <Diagram  setHandle={setHandle} />
            </div>
        </div>
    )
}