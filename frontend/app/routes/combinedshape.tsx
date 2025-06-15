import { json, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useSvg } from "~/components/contexts/SvgContextProvider";
import { DiagramMenu } from "~/components/diagram/DiagramMenu";
import { Elem } from "~/model/elem/Elem";


export default function DiagramPage() {
  const diagram = useDiagram();
  const svg = useSvg();
	const [elem, setElem] = useState<Elem | undefined>();
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (!isFirstRender.current) {
			return;
		}
		isFirstRender.current = false;
		if (!diagram || !svg) {
				return;
		}
		const newDiagram = diagram.reset("free");
		svg.reset(newDiagram.getSvg(), document.getElementById('svgContainer')! as HTMLDivElement);

		diagram?.diagram?.addDefaultElem();

		setElem(elem);
	}, []);

	return (
			<div className="flex text-black place-items-center w-full">
					<div className="flex grow items-center w-full h-full justify-center">
							<div>
									<DiagramMenu />
							</div>
					</div>
			</div>
	);
}