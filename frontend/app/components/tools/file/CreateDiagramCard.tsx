import { useCallback } from "react";
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
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useSvg } from "~/components/contexts/SvgContextProvider";

export const CreateDiagramCard = () => {
  const svg = useSvg()
  const diagram = useDiagram()

  const handleCreate= useCallback(() => {
    const newDiagram = diagram!.reset()
    svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement)
  }, [svg, diagram])

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Create diagram</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new diagram</DialogTitle>
            <DialogDescription>
              Are you sure? Unsaved changing be deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleCreate}>Create diagram</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
}