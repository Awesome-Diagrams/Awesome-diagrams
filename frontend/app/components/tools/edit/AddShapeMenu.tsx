import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {ShapeConfig, shapeConfigs} from "~/internal/config/FigureConfigs"
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";
import { getAvailableConnectorType, getAvailableShapeTypes } from "~/model/diagram/DiagramSchemaType";
import { DiagramConfig } from "../file/CreateDiagramCard";

export const AddShapeMenu = () => {
    const diagram = useDiagram()!
    const configs: ShapeConfig[] | undefined = useMemo(() => {
        if (!diagram.diagram) {
            return;
        }
        const type = diagram.diagram.getDiagramType();

        return Array.from(shapeConfigs.filter((conf) => {
            return getAvailableShapeTypes(type).find((it) => it === conf.type)
        }));
    }, [diagram]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button title="Add Shape">
                    Add shape
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {configs?.map((config, idx) => (
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
        const elem = diagram.diagram.addDefaultElem()
        elem.setShape(config.createShape())
        elem.applyConfig();
        elem.setType(config.type)
    }, [diagram, config])

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
        </button> 
    </>)
}