import { useCallback } from "react";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useSvg } from "~/components/contexts/SvgContextProvider";
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "~/components/ui/dialog"
import { deserializeDiagram } from "~/internal/serialization/DiagramDeserializator";
import { serializeDiagram } from "~/internal/serialization/DiagramSerializator";


export const ExportDiagramCard = () => {
  const diagram = useDiagram()
  const svg = useSvg()

  const handleExport = useCallback(() => {
    if (!diagram?.diagram) {
      // TODO: add logger
      return;
    }
    // TODO: add writer to file
    console.log(JSON.stringify(serializeDiagram(diagram.diagram)))
    const s = serializeDiagram(diagram.diagram)
    const newDiagram = deserializeDiagram(s)
    // set new diagram for test
    diagram.set(newDiagram)
    svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement)
  }, [diagram])

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Export diagram</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Export diagram</DialogTitle>
            <DialogDescription>
                Are you sure to save diagram?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleExport}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
}
  