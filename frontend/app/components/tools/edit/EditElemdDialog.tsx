import { useCallback, useState } from "react"
import { useDiagram } from "~/components/contexts/DiagramContextProvider"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Elem } from "~/model/elem/Elem"
import { EditElemForm } from "./EditElemForm"
import { ClassDiagramEditForm } from "./ClassDiagramEditForm"
import { ShapeType } from "~/model/DiagramSerialized"
import { InterfaceDiagramEditForm } from "./InterfaceDiagramEditForm"

export const EditElemDialog = () => {
  const diagram = useDiagram()!;
  const [elem, setElem] = useState<Elem>();

  const handleOpenChange = useCallback(() => {
    if (elem) {
      setElem(undefined);
      return;
    }

    const selectedElem = diagram.diagram?.getSelectedElem();
    if (!selectedElem) {
      return;
    }

    setElem(selectedElem);
  }, [setElem, elem, diagram.diagram]);

  // Функция для рендеринга соответствующей формы
  const renderForm = () => {
    if (!elem) {
      return (
        <div className="grid gap-4 py-4">
          You must select one elem
        </div>
      );
    }

    switch (elem.getType() ) {
      case ShapeType.UMLClass:
        return <ClassDiagramEditForm elem={elem} />;
	  case ShapeType.UMLInterface:
        return <InterfaceDiagramEditForm elem={elem} />;
      default:
        return <EditElemForm elem={elem} />;
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit Element</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle>
            {elem 
              ? `Edit ${elem.getType() === ShapeType.UMLActor  ? 'Class Diagram' : 'Element'} properties`
              : 'Edit Element'
            }
          </DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};