import { useDiagram } from "../contexts/DiagramContextProvider"
import { useSvg } from "../contexts/SvgContextProvider"

export const DiagramMenu = () => {
    const {svg} = useSvg()!;
    const {diagram} = useDiagram()!;

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-4rem)]">
            <div
                className="outline rounded-md mx-auto"
                id="svgContainer"
                style={{
                    height: diagram?.getHeight(),
                    width: diagram?.getWidth()
                }}
            >
                {!svg && (
                    <h1 className="flex justify-center p-4">
                        Загрузите или создайте диаграмму
                    </h1>
                )}
            </div>
        </div>
    );
}