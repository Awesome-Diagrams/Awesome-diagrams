import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";
import { Connector } from "~/model/elem/Connector";

export const AddConnectorButton = () => {
    const diagram = useDiagram();

    const handleAddConnector = useCallback(() => {
        if (!diagram?.diagram) {
            // TODO: Add proper logger
            console.warn("No diagram available");
            return;
        }

        // Получаем выделенные элементы
        const selectedElems = diagram.diagram.getTwoSelectedElems();
        if (selectedElems === null) {
            alert("Please select exactly two elements to add a connector.");
            return;
        }

        const [elem1, elem2] = selectedElems;

        // Создаём коннектор между двумя выделенными элементами
        diagram.diagram.addConnector(new Connector(elem1, elem2, diagram.diagram.getGroup()));
    }, [diagram]);

    return (
        <Button title="Add Connector" onClick={handleAddConnector}>
            Add Connector
        </Button>
    );
};
