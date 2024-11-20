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
import { SvgContainerHandle } from "~/internal/svg/svgContainer/hook";

interface ExportCardProps {
  svgContainer: SvgContainerHandle | undefined;
}

export const ExportCard = ({svgContainer}: ExportCardProps) => {
  const handleExport = useCallback(() => {
    console.log(svgContainer?.svg.children())
  }, [svgContainer])

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Export</Button>
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
  