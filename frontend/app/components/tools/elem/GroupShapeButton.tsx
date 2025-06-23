import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";

export const GroupShapeButton = () => {
    const diagram = useDiagram()!;

		const handleGroup = useCallback(() => {
			diagram.diagram?.groupElements();
		}, [diagram.diagram]);

    return (
			<Button title="Group two elements" onClick={handleGroup}>
				Group
			</Button>
    );
};