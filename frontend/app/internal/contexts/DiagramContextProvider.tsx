import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react"
import { updateSvg, useSvgContainer } from "../svg/svgContainer/hook";
import { Svg } from "@svgdotjs/svg.js";
import { Diagram } from "../model/diagram/Diagram";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: (svg: Svg) => void
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export const useDiagram = () => {
  return useContext(DiagramContext);
};

export const DiagramContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [diagram, setDiagram] = useState<Diagram>();

    const reset = useCallback((svg: Svg) => {
        setDiagram(new Diagram(svg))
    }, [])

    return (
        <DiagramContext.Provider
            value={{
                diagram: diagram,
                reset: reset,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};