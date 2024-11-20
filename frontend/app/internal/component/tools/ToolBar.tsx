import { Button } from "~/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {ShapeConfig, shapeConfigs} from "~/internal/config/FigureConfigs"
import { useDiagram } from "~/internal/contexts/DiagramContextProvider";
import { useCallback } from "react";


export const ToolBar = () => {
    return (
        <div className="outline rounded-md ml-10">
            <div className="flex w-20 flex-col justify-center gap-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button title="Add Shape">
                            <SquarePlus />
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
            </div>
        </div>
    );
};

interface ShapeDropDownMenuProps {
    config: ShapeConfig;
}

const ShapeDropDownMenu = ({config}: ShapeDropDownMenuProps) => {
    const diagram = useDiagram()

    const clickHandler = useCallback(() => {
        if (!diagram) {
            return;
        }
        diagram?.diagram?.addElem(config.shapeType)
    }, [diagram, config])

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={clickHandler}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.shapeType}</div>
        </button> 
    </>)
}