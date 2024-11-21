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

export const CreateCard = () => {
  const svg = useSvg()
  const diagram = useDiagram()

  const handleCreate= useCallback(() => {
    console.log(document.getElementById('svgContainer')! as HTMLDivElement)
    svg?.reset(document.getElementById('svgContainer')! as HTMLDivElement)
    diagram!.reset(svg!.svg!)
  }, [svg])

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Create</Button>
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