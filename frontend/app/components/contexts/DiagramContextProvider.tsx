import { createContext, useCallback, useContext, useState } from "react"
import { Svg } from "@svgdotjs/svg.js";
import { Diagram } from "~/model/diagram/Diagram";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: (svg: Svg) => void
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export const useDiagram = () => {
  return useContext(DiagramContext);
};

export interface DiagramContextProviderProps {
    children: React.ReactNode
}

export const DiagramContextProvider = ({ children }: DiagramContextProviderProps) => {
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