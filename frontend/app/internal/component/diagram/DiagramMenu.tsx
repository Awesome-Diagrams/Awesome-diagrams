import { SvgContainer } from "~/internal/svg/svgContainer/SvgContainer";
import { useSvg } from "~/internal/contexts/SvgContextProvider";


export const DiagramMenu = () => {
    const {svg} = useSvg()!

    return (
        <>
            {!svg && (
                <h1>Загрузите или создайте диаграмму</h1>
            )}
            {svg && (
                <div className="outline rounded-md app">
                    <SvgContainer />
                </div>
            )}
        </>
    )
}