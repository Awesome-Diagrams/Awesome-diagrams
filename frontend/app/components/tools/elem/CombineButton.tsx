import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";

export const CombineButton = () => {
    const diagram = useDiagram()!;

		const handleCombine = useCallback(() => {
			diagram.diagram?.combineElements();
		}, [diagram.diagram]);

    return (
			<Button title="Combine two elements" onClick={handleCombine}>
				Combine
			</Button>
    );
};