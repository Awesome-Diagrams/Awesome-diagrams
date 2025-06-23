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
  ArrowRightCircle,
  Sigma
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "~/components/ui/dropdown-menu";

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
        
        const schema = diagram.diagram.getSchema();
        const availableTypes = schema.getAvailableConnectorTypes();
        
        return connectorConfigs.filter(config => 
            availableTypes.includes(config.type)
        );
    }, [diagram.diagram]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    title="Add Connector"
                    variant="default"
                    className="gap-2"
                >
                    Add Connector
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {configs.map((config, idx) => (
                    <DropdownMenuItem key={`${config.type}-${idx}`}>
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

const ConnectorDropDownMenu = ({ config }: ConnectorDropDownMenuProps) => {
    const diagram = useDiagram()!;

    const handleAddConnector = useCallback(() => {
        if (!diagram.diagram) {
            console.warn("Diagram instance not available");
            return;
        }

        const selectedElems = diagram.diagram.getTwoSelectedElems();
        if (!selectedElems) {
            alert("Please select exactly two elements to connect");
            return;
        }

        const [elem1, elem2] = selectedElems;
        const schema = diagram.diagram.getSchema();

        if (!schema.validateConnectionBetweenShapes(
            elem1.getType(), 
            elem2.getType(), 
            config.type
        )) {
            alert(`Connection "${config.name}" is not allowed between these elements`);
            return;
        }

        diagram.diagram.addConnector(
            new Connector(elem1, elem2, diagram.diagram.getGroup())
                .setType(config.type)
        );
    }, [config.type, diagram.diagram]);

    return (
        <div 
            className="flex items-center w-full px-2 py-1.5 text-sm hover:bg-accent"
            onClick={handleAddConnector}
        >
            <config.icon className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{config.name}</span>
        </div>
    );
};