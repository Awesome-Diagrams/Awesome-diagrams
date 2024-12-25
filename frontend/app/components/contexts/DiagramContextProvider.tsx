import { createContext, useCallback, useContext, useState } from "react"
import { Diagram } from "~/model/diagram/Diagram";
import { DiagramSchemaType } from "~/model/diagram/DiagramSchemaType";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: (diagramType: DiagramSchemaType) => Diagram;
    set: (diagram: Diagram) => void;
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
    

    const reset = useCallback((diagramType: DiagramSchemaType) => {
        const diagram = new Diagram(diagramType)
        setDiagram(diagram)
        
        return diagram
    }, [])

    const set = useCallback((diagram: Diagram) => {
        setDiagram(diagram)
    }, [])

    return (
        <DiagramContext.Provider
            value={{
                set: set,
                diagram: diagram,
                reset: reset,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};