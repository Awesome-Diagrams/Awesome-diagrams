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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { SvgContainerHandle } from "~/internal/svg/svgContainer/hook";
import { SvgContainer } from "~/internal/svg/svgContainer/SvgContainer";

interface ImportCardProps {
  svgContainer: SvgContainerHandle | undefined;
}

export const ImportCard = ({svgContainer}: ImportCardProps) => {
  const handleImport = useCallback(() => {

  }, [])
  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button>Import</Button>
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
            <Button type="submit" onClick={handleImport}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
}
  