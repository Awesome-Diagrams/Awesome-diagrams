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
import * as fs from "file-saver";


export const ExportDiagramCard = () => {
  const diagram = useDiagram()

  const handleExport = useCallback(() => {
    if (!diagram?.diagram) {
      // TODO: add logger
      return;
    }
    

    const blob = new Blob(
      [JSON.stringify(serializeDiagram(diagram.diagram))],
      {type: "text/plain;charset=utf-8"},
    );
    fs.saveAs(blob, "diagram.json");
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
  