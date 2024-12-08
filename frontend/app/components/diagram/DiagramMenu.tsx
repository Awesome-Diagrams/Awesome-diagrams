import { useDiagram } from "../contexts/DiagramContextProvider"
import { useSvg } from "../contexts/SvgContextProvider"

export const DiagramMenu = () => {
    const {svg} = useSvg()!
    const {diagram} = useDiagram()!

    return (
        <div>
            <div className="outline rounded-md" id="svgContainer" style={{height: diagram?.getHeight(), width: diagram?.getWidth()}} >
                {!svg && (
                    <h1 className="flex justify-center">Загрузите или создайте диаграмму</h1>
                )}
            </div>
        </div>
    );
}