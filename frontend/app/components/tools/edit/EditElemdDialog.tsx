import { useCallback, useState } from "react"
import { useDiagram } from "~/components/contexts/DiagramContextProvider"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Elem } from "~/model/elem/Elem"
import { EditElemForm } from "./EditElemForm"

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

	return (
		<Dialog onOpenChange={handleOpenChange}>
		<DialogTrigger asChild>
			<Button>Edit Element</Button>
		</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] text-black">
				<DialogHeader>
					<DialogTitle>Edit element properties</DialogTitle>
				</DialogHeader>
				{elem 
					? <EditElemForm elem={elem} />
					: <div className="grid gap-4 py-4">
						You must select one elem
					</div>
				}
			</DialogContent>
	</Dialog>
	)
}