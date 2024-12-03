import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {ShapeConfig, shapeConfigs} from "~/internal/config/FigureConfigs"
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";


export const AddShapeMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button title="Add Shape">
                    Add shape
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {shapeConfigs.map((config, idx) => (
                    <DropdownMenuItem key={idx}>
                        <ShapeDropDownMenu config={config} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface ShapeDropDownMenuProps {
    config: ShapeConfig;
}

const ShapeDropDownMenu = ({config}: ShapeDropDownMenuProps) => {
    const diagram = useDiagram()!

    const clickHandler = useCallback(() => {
        if (!diagram.diagram) {
            // TOOD: add logger
            return;
        }
        diagram.diagram.addDefaultElem()
    }, [diagram, config])

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.shapeType}</div>
        </button> 
    </>)
}