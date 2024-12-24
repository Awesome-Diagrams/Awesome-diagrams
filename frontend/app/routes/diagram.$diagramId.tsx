import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { DiagramSerialized } from "~/model/DiagramSerialized";
import { deserializeDiagram } from "~/internal/serialization/DiagramDeserializator";
import { useSvg } from "~/components/contexts/SvgContextProvider";
import { Diagram } from "~/model/diagram/Diagram";


export const loader: LoaderFunction = async ({ params }) => {
    const { diagramId } = params;


    const response = await fetch(`http://localhost:8080/diagrams/${diagramId}`);

    if (!response.ok) {
        throw new Response("Diagram not found", { status: 404 });
    }

    const diagram = await response.json();

    if (!diagram.diagramData) {
        throw new Response("Diagram data not found", { status: 400 });
    }

    return json(diagram.diagramData);
};

export default function DiagramPage() {
    const diagramData = useLoaderData<string>();
    const diagram = useDiagram();
    const svg = useSvg();
    const isFirstRender = useRef(true);
    const [newDiagram, setNewDiagram] = useState<Diagram | null>(null);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            if (diagramData) {
                try {
                    const parsedData = JSON.parse(diagramData) as DiagramSerialized;
                    const newDiagram = deserializeDiagram(parsedData);
                    setNewDiagram(newDiagram);
                    diagram!.set(newDiagram);
                    svg?.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement);
                } catch (error) {
                    console.error("Ошибка парсинга:", error);
                    setNewDiagram(null);
                }
            }
        }
    }, [diagramData, diagram, svg]);

    return (
        <div className="flex text-black place-items-center w-full">
            <div className="flex grow items-center w-full h-full justify-center">
                <div>
                    <div className="outline rounded-md"
                         id="svgContainer"
                         style={{height: newDiagram?.getHeight(), width: newDiagram?.getWidth()}} >
                    </div>
                </div>
            </div>
        </div>
    );
}