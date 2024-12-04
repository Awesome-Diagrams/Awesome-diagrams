import { useCallback } from "react";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
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
import { serializeDiagram } from "~/internal/serialization/DiagramSerializator";


export const ExportDiagramCard = () => {
  const diagram = useDiagram()

  const handleExport = useCallback(() => {
    if (!diagram?.diagram) {
      // TODO: add logger
      return;
    }
    console.log(serializeDiagram(diagram.diagram))
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
  