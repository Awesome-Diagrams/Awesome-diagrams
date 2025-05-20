import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useSvg } from "~/components/contexts/SvgContextProvider";
import { DiagramSchemaType } from "~/model/diagram/DiagramSchemaType";
import { LucideProps, RectangleHorizontalIcon, CuboidIcon, TvIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useUser } from "~/hooks/useUser";

export type DiagramConfig = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  name: string
  type: DiagramSchemaType 
}

type CustomSchema = {
  id: number
  name: string
  diagramData: string
}

const diagramConfig: DiagramConfig[] = [
  {
    name: "Free mode",
    icon: RectangleHorizontalIcon,
    type: "free",
  },
  {
    name: "Block schema mode",
    icon: CuboidIcon,
    type: "block",
  },
  {
    name: "My custom schemas",
    icon: TvIcon,
    type: "custom",
  },
];

export const CreateDiagramCard = () => {
  const svg = useSvg();
  const diagram = useDiagram();

  const handleCreate = useCallback((diagramType: DiagramSchemaType) => {
    const newDiagram = diagram!.reset(diagramType);
    svg?.reset(newDiagram.getSvg(), document.getElementById("svgContainer")! as HTMLDivElement);
  }, [svg, diagram]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title="Add Shape">
          Add Diagram
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        {diagramConfig.map((config, idx) => (
          <DropdownMenuItem key={idx}>
            <ShapeDropDownMenu config={config} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface DiagramDropDownMenuProps {
  config: DiagramConfig;
}

const ShapeDropDownMenu = ({ config }: DiagramDropDownMenuProps) => {
  const diagram = useDiagram()!;
  const svg = useSvg()!;
  const user = useUser();
  const [schemas, setSchemas] = useState<CustomSchema[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchSchemas = async () => {
    if (!user || loaded) return;

    const resId = await fetch(`http://localhost:8080/idByUsername?username=${user}`, {
      credentials: "include",
    });
    const { id } = await resId.json();
    if (!id) return;

    const resSchemas = await fetch(`http://localhost:8080/schemas/user/${id}`, {
      credentials: "include",
    });
    const data = await resSchemas.json();
    setSchemas(data);
    setLoaded(true);
  };

  const handleCreate = useCallback(() => {
    if (config.type !== "custom") {
      const newDiagram = diagram.reset(config.type);
      svg.reset(newDiagram.getSvg(), document.getElementById("svgContainer")! as HTMLDivElement);
    }
  }, [svg, diagram]);

  if (config.type === "custom") {
    return (
      <DropdownMenu onOpenChange={(open) => {
        if (open) fetchSchemas();
      }}>
        <DropdownMenuTrigger asChild>
          <button className="h-full w-full flex flex-row gap-1">
            <config.icon className="mr-2 h-4 w-4" />
            <div>{config.name}</div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          {schemas.length === 0 ? (
            <DropdownMenuItem disabled>No schemas found</DropdownMenuItem>
          ) : (
            schemas.map((schema) => (
              <DropdownMenuItem
                key={schema.id}
                onClick={() => {
                  const newDiagram = diagram.reset(config.type, schema.diagramData);
                  svg.reset(newDiagram.getSvg(), document.getElementById("svgContainer")! as HTMLDivElement);
                }}
              >
                {schema.name}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button className="h-full w-full flex flex-row gap-1" onClick={handleCreate}>
      <config.icon className="mr-2 h-4 w-4" />
      <div>{config.name}</div>
    </button>
  );
};
