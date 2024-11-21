import { useSvg } from "../contexts/SvgContextProvider"

export const DiagramMenu = () => {
    return (
        <div className="outline rounded-md w-11/12 h-4/5">
            <SvgContainer />
        </div>
    )
}

export const SvgContainer = () => {
    const {svg} = useSvg()!

    return (
        <div id="svgContainer">
            {!svg && (
                <h1 className="flex justify-center">Загрузите или создайте диаграмму</h1>
            )}
        </div>
    );
}
  