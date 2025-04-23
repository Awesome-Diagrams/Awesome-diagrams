import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";
import { Connector } from "~/model/elem/Connector";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { LucideProps, LucideTrendingUp, Minus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { getAvailableConnectorType } from "~/model/diagram/DiagramSchemaType";

const connectorConfigs: ConnectorConfig[] = [
    {
        type: 'polyline',
        name: 'Polyline',
        icon: LucideTrendingUp,
    },
    {
        type: 'straight',
        name: 'Straight',
        icon: Minus,
    }
];

export const AddConnectorButton = () => {
    const diagram = useDiagram()!
    const configs: ConnectorConfig[] | undefined = useMemo(() => {
        if (!diagram.diagram) {
            return;
        }
        const schema = diagram.diagram.getSchema();

        return Array.from(connectorConfigs.filter((conf) => {
            return schema.getAvailableConnectorTypes().find((it) => it === conf.type)
        }));
    }, [diagram]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button title="Add Connector">
                Add Connector
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {configs?.map((config, idx) => (
                    <DropdownMenuItem key={idx}>
                        <ConnectorDropDownMenu config={config} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export interface ConnectorConfig {
    type: ConnectorType;
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ConnectorDropDownMenuProps {
    config: ConnectorConfig;
}

const ConnectorDropDownMenu = ({config}: ConnectorDropDownMenuProps) => {
    const diagram = useDiagram()!

    const handleAddConnector = useCallback(() => {
        if (!diagram?.diagram) {
            // TODO: Add proper logger
            console.warn("No diagram available");
            return;
        }

        // Получаем выделенные элементы
        const selectedElems = diagram.diagram.getTwoSelectedElems();
        if (selectedElems === null) {
            alert("Please select exactly two elements to add a connector.");
            return;
        }

        const [elem1, elem2] = selectedElems;

        // Создаём коннектор между двумя выделенными элементами
        diagram.diagram.addConnector(
            new Connector(elem1, elem2, diagram.diagram.getGroup())
                .setType(config.type)
        );
    }, [config.type, diagram.diagram]);

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={handleAddConnector}>
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
        </button> 
    </>)
}
