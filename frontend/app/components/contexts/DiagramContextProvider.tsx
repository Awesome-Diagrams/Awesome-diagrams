import { createContext, useCallback, useContext, useState } from "react"
import { Diagram } from "~/model/diagram/Diagram";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: () => Diagram;
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
    

    const reset = useCallback(() => {
        const diagram = new Diagram()
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