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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"


export const ImportDiagramCard = () => {
  const diagram = useDiagram()

  const handleImport = useCallback(() => {
    if (!diagram?.diagram) {
      // TODO: add logger
      return
    }

  }, [diagram])

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Import diagram</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Import diagram from file</DialogTitle>
            <DialogDescription>
              Choose file of diagram to import.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="diagram">Diagram</Label>
          <Input id="diagram" type="file" accept=".json"/>
          <DialogFooter>
            <Button onClick={handleImport}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
}
  