import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";

export const ExcludeButton = () => {
    const diagram = useDiagram()!;

		const handleCombine = useCallback(() => {
			diagram.diagram?.excludeElements();
		}, [diagram.diagram]);

    return (
			<Button title="Combine two elements" onClick={handleCombine}>
				Exclude
			</Button>
    );
};