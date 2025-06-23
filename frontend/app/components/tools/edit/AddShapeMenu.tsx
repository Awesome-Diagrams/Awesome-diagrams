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
import { ElemBuilder } from "~/model/elem/ElemBuilder";
import { G } from "@svgdotjs/svg.js";

export const AddShapeMenu = () => {
    const diagram = useDiagram()!
    const configs: ShapeConfig[] | undefined = useMemo(() => {
        if (!diagram.diagram) {
            return;
        }
        const schema = diagram.diagram.getSchema();

        return Array.from(shapeConfigs.filter((conf) => {
            return schema.getAvailableShapeTypes().find((it) => it === conf.type)
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
        const elembuilder = new ElemBuilder(new G());

        const elem = elembuilder
            .withBaseElem(diagram.diagram.addDefaultElem())
            .withShape(config.createShape())
            .withType(config.type)
            .withConfig(config.config)
            .build();
    }, [diagram, config])

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
        </button> 
    </>)
}