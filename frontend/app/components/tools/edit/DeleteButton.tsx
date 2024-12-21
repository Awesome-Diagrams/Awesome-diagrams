import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";

export const DeleteButton = () => {
    const diagram = useDiagram();

    const handleDelete = useCallback(() => {
        if (!diagram?.diagram) {
            return;
        }

        diagram.diagram.deleteSelectedElems();
    }, [diagram]);

    return (
        <Button title="Delete" onClick={handleDelete} className="bg-red-500 text-white">
            Delete
        </Button>
    );
};
