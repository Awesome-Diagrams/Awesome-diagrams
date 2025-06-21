import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";
import { useNavigate } from "@remix-run/react";

export const CreateCustomSchemaButton = () => {
    const navigate = useNavigate()
    const handleDelete = useCallback(() => {
        navigate(`/schemas`)
    }, [navigate]);

    return (
        <Button title="Create Custom Schema" onClick={handleDelete}>
            Create custom schema
        </Button>
    );
};
