import { createContext, useCallback, useContext, useState } from "react"
import { Svg } from "@svgdotjs/svg.js";
import { Diagram } from "~/model/diagram/Diagram";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: () => Diagram
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
    

    const reset = useCallback(() => {
        var diagram = new Diagram()
        setDiagram(diagram)
        
        return diagram
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