import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";

export const CreateCombinedShapeButton = () => {
    const navigate = useNavigate()
    const handleCreate = useCallback(() => {
        navigate(`/combinedshape`)
    }, [navigate]);

    return (
        <Button title="Create combined shape" onClick={handleCreate}>
            Create combined shape
        </Button>
    );
};
