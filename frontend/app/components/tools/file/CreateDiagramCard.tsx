import { useCallback } from "react";
import { Button } from "~/components/ui/button"
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useSvg } from "~/components/contexts/SvgContextProvider";
import { DiagramSchemaType } from "~/model/diagram/DiagramSchemaType";
import { LucideProps, RectangleHorizontalIcon, CuboidIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export type DiagramConfig = {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  name: string
  type: DiagramSchemaType 
}

const diagramConfig: DiagramConfig[] = [
  {
    name: "Free mode",
    icon: RectangleHorizontalIcon,
    type: 'free',
  },
  {
    name: "Block schema mode",
    icon: CuboidIcon,
    type: 'block',
  },
]

export const CreateDiagramCard = () => {
  const svg = useSvg()
  const diagram = useDiagram()

  const handleCreate= useCallback((diagramType: DiagramSchemaType) => {
    const newDiagram = diagram!.reset(diagramType)
    svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement)
  }, [svg, diagram])

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button title="Add Shape">
            Add Diagram
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
        {diagramConfig.map((config, idx) => (
            <DropdownMenuItem key={idx}>
                <ShapeDropDownMenu config={config} />
            </DropdownMenuItem>
        ))}
    </DropdownMenuContent>
</DropdownMenu>
      )
}

interface DiagramDropDownMenuProps {
  config: DiagramConfig;
}

const ShapeDropDownMenu = ({config}: DiagramDropDownMenuProps) => {
  const diagram = useDiagram()!
  const svg = useSvg()!

  const handleCreate= useCallback(() => {
    const newDiagram = diagram!.reset(config.type)
    svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement)
  }, [svg, diagram])

  return (<>
     <button className="h-full w-full flex flex-row gap-1" onClick={handleCreate}>
          <config.icon className="mr-2 h-4 w-4" />
          <div>{config.name}</div>
      </button> 
  </>)
}