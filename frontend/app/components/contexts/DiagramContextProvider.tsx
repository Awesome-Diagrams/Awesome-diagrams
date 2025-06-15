import { createContext, useCallback, useContext, useState } from "react"
import { Diagram } from "~/model/diagram/Diagram";
import { DiagramSchemaType } from "~/model/diagram/DiagramSchemaType";
import { CustomSchema } from "~/model/schema/CustomSchema";
import { DiagramSchemaAdapter } from "~/model/schema/DiagramSchemaAdapter";

type DiagramContextType = {
    diagram: Diagram | undefined;
    reset: (diagramType: DiagramSchemaType, jsonData?: string) => Diagram;
    set: (diagram: Diagram) => void;
    clear: () => void;
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export const useDiagram = () => {
  return useContext(DiagramContext);
};

export interface DiagramContextProviderProps {
    children: React.ReactNode
}

export const DiagramContextProvider = ({ children }: DiagramContextProviderProps) => {
    const [diagram, setDiagram] = useState<Diagram | undefined>();

    const reset = useCallback((diagramType: DiagramSchemaType, jsonData?: string) => {
        let newDiagram: Diagram;

        if (diagramType === "custom" && jsonData) {
            const schema = CustomSchema.fromJSON(jsonData);
            newDiagram = new Diagram(schema);
        } else {
            const adapter = new DiagramSchemaAdapter(diagramType);
            const schema = adapter.getCustomSchema();
            newDiagram = new Diagram(schema);
        }

        setDiagram(newDiagram);
        return newDiagram;
    }, []);

    const set = useCallback((diagram: Diagram) => {
        setDiagram(diagram);
    }, []);

    const clear = useCallback(() => setDiagram(undefined), []);

    return (
        <DiagramContext.Provider
            value={{
                set: set,
                diagram: diagram,
                reset: reset,
                clear: clear,
            }}
        >
            {children}
        </DiagramContext.Provider>
    );
};
