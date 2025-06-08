import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Connector } from "~/model/elem/Connector";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { LucideProps, LucideTrendingUp, Minus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Elem } from "~/model/elem/Elem";
import { useUser } from "~/hooks/useUser";

type ElemWithName = {
	name: string;
	elem: Elem;
}

export const AddCombinedShapeButton = () => {
    const [elems, setElems] = useState<ElemWithName[]>([]);
		const user = useUser();

		useEffect(() => {
			if (!user) {
				return;
			}

			fetch(`localhost:8080/combined-shape/user/${user.id}`)
				.then((data) => {
					console.log(data);
				})
		}, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button title="Add combined shape">
                Add combined shape
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {elems?.map((elem, idx) => (
                    <DropdownMenuItem key={idx}>
                        <CombinedShapeDropDownMenu elem={elem} key={idx} />
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export interface ConnectorConfig {
    type: ConnectorType;
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ConnectorDropDownMenuProps {
  elem: ElemWithName;
}

const CombinedShapeDropDownMenu = ({elem}: ConnectorDropDownMenuProps) => {
    const diagram = useDiagram()!

    const handleAddShape = useCallback(() => {
        if (!diagram?.diagram) {
            // TODO: Add proper logger
            console.warn("No diagram available");
            return;
        }


        // Создаём коннектор между двумя выделенными элементами
        diagram.diagram.addElem(elem.elem);
    }, [diagram.diagram]);

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={handleAddShape}>
            <div>{elem.name}</div>
        </button> 
    </>)
}
