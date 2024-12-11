import { Button } from "~/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react"; // Иконки для зума
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";

export const ZoomControls = () => {
    const diagram = useDiagram()!;

    const handleZoomIn = useCallback(() => {
        if (!diagram.diagram) return;

        diagram.diagram.scaleGroup(1.1); 
    }, [diagram]);

    const handleZoomOut = useCallback(() => {
        if (!diagram.diagram) return;

        diagram.diagram.scaleGroup(0.9);
    }, [diagram]);

    return (
        <div className="border border-gray-300 rounded-lg p-2 inline-flex items-center gap-2 bg-white shadow-sm">
            <Button className="px-2 py-1 text-sm" title="Zoom In" onClick={handleZoomIn}>
                <ZoomIn className="h-3 w-3" />
            </Button>
            <Button className="px-2 py-1 text-sm" title="Zoom Out" onClick={handleZoomOut}>
                <ZoomOut className="h-3 w-3" />
            </Button>
        </div>
    );
};
