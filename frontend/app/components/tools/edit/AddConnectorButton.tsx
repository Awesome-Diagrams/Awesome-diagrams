import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useMemo } from "react";
import { Connector } from "~/model/elem/Connector";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { 
  LucideProps, 
  LucideTrendingUp, 
  Minus, 
  ArrowRight, 
  Triangle, 
  Diamond, 
  Gem,
  ArrowRightCircle
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "~/components/ui/dropdown-menu";
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
    },
    {
        type: 'inheritance',
        name: 'Inheritance',
        icon: Triangle,
    },
    {
        type: 'aggregation',
        name: 'Aggregation',
        icon: Diamond,
    },
    {
        type: 'composition',
        name: 'Composition',
        icon: Gem,
    },
    {
        type: 'association',
        name: 'Association',
        icon: ArrowRight,
    },
    {
        type: 'dependency',
        name: 'Dependency',
        icon: ArrowRightCircle,
    }
];


export const AddConnectorButton = () => {
    const diagram = useDiagram()!;
    const configs = useMemo(() => {
        if (!diagram.diagram) return [];
        
        const diagramType = diagram.diagram.getDiagramType();
        const availableTypes = getAvailableConnectorType(diagramType);
        console.log('Available connector types:', availableTypes); // Добавьте эту строку
        
        return connectorConfigs.filter(config => 
            availableTypes.includes(config.type)
        );
    }, [diagram.diagram]);

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
        console.warn("No diagram available");
        return;
    }

    const selectedElems = diagram.diagram.getTwoSelectedElems();
    if (selectedElems === null) {
        alert("Please select exactly two elements to add a connector.");
        return;
    }

    const [elem1, elem2] = selectedElems;
    const connectorType = config.type;
    const availableTypes = getAvailableConnectorType(diagram.diagram.getDiagramType());

    if (!availableTypes.includes(connectorType)) {
        alert(`Connector type ${connectorType} is not supported for this diagram`);
        return;
    }

    diagram.diagram.addConnector(
        new Connector(elem1, elem2, diagram.diagram.getGroup())
            .setType(connectorType)
    );
}, [config.type, diagram.diagram]);

    return (
        <button 
            className="h-full w-full flex flex-row gap-1 items-center" 
            onClick={handleAddConnector}
        >
            <config.icon className="mr-2 h-4 w-4" />
            <span>{config.name}</span>
        </button>
    );
}