import { useDiagram } from "../contexts/DiagramContextProvider"
import { useSvg } from "../contexts/SvgContextProvider"
import { AddShapeMenu } from "../tools/edit/AddShapeMenu"
import { CreateCard } from "../tools/file/CreateCard"

export const DiagramMenu = () => {
    return (
        <div className="outline rounded-md w-11/12 h-4/5">
            <SvgContainer />
        </div>
    )
}

export const SvgContainer = () => {
    const {svg} = useSvg()!
    const {diagram} = useDiagram()!

    return (
        <div>
            <AddShapeMenu />
            <CreateCard />
            <div id="svgContainer" style={{height: diagram?.getHeight(), width: diagram?.getWidth()}} >
                {!svg && (
                    <h1 className="flex justify-center">Загрузите или создайте диаграмму</h1>
                )}
            </div>
        </div>
    );
}
  