import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { useUser } from "~/hooks/useUser";
import { deserializeElem } from "~/internal/serialization/DiagramDeserializator";
import { ElemSerialized } from "~/model/DiagramSerialized";

type ElemWithName = {
	name: string;
	combinedShape: string;
}

export const AddCombinedShapeButton = () => {
    const [elems, setElems] = useState<ElemWithName[]>([]);
		const user = useUser();

		useEffect(() => {
			if (!user) {
				return;
			}
            const fun = async() => {
                const data = await (await fetch(`http://localhost:8080/combined-shape/user/${user.id}`,
                    {
                        credentials: "include",
                    }
                )).json();
                setElems(data);
            }
            fun();
		}, [user]);

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

interface ConnectorDropDownMenuProps {
  elem: ElemWithName;
}

const CombinedShapeDropDownMenu = ({elem}: ConnectorDropDownMenuProps) => {
    const diagram = useDiagram()!

    const handleAddShape = useCallback(() => {
        if (!diagram?.diagram) {
            console.warn("No diagram available");
            return;
        }

        diagram.diagram.addElem(deserializeElem(JSON.parse(elem.combinedShape) as ElemSerialized, diagram.diagram.getSelectionController(), diagram.diagram.getGroup()))
    }, [diagram.diagram]);

    return (<>
       <button className="h-full w-full flex flex-row gap-1" onClick={handleAddShape}>
            <div>{elem.name}</div>
        </button> 
    </>)
}
