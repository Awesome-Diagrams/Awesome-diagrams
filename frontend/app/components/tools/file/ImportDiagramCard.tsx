import { ChangeEvent, useCallback, useState } from "react";
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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { deserializeDiagram } from "~/internal/serialization/DiagramDeserializator";
import { DiagramSerialized } from "~/model/DiagramSerialized";


export const ImportDiagramCard = () => {
  const [file, setFile] = useState<File>();
  const diagram = useDiagram();
  const svg = useSvg();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(file)
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = useCallback(() => {
    if (!file) {
      // TODO: add logger
      return;
    }
    
    file.text().then(value => {
      const newDiagram = deserializeDiagram(JSON.parse(value) as DiagramSerialized);
      diagram!.set(newDiagram);
      svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement);
    })
  }, [diagram, file, svg])

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
          <Label htmlFor="diagram-input">Diagram</Label>
          <Input id="diagram-input" type="file" accept=".json" onChange={handleFileChange} />
          {file && <div className="text-black">File {file.name} will be imported</div>}
          <DialogFooter>
            <Button onClick={handleImport} type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
}
  