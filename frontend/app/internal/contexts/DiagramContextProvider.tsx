import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react"
import { DiagramType } from "../type/diagram/DiagramType"
import { ShapeType } from "../type/shape/ShapeType";
import { updateSvg, useSvgContainer } from "../svg/svgContainer/hook";
import { Svg } from "@svgdotjs/svg.js";

type DiagramContextType = {
    diagram: DiagramType | undefined;
    setDiagram: (diagram: DiagramType | undefined) => void;
    resetDiagram: () => void;
    addShape: (shape: ShapeType) => void;
    removeShape: (idx: number) => void;
    changeShape: (shape: ShapeType, idx: number) => void;
    updateSvgContainer: (effect: (svg: Svg) => void) => void;
}

const DiagramContext = createContext<DiagramContextType | undefined>(undefined);

export const useDiagram = () => {
  return useContext(DiagramContext);
};

export const DiagramContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { setHandle, svgContainer } = useSvgContainer();
    const [diagram, setDiagram] = useState<DiagramType | undefined>();

    const resetDiagram = useCallback(() => {
        setHandle(undefined)
        setDiagram(undefined)
    }, [])

    const addShape = useCallback((shape: ShapeType) => {
        if (!diagram) {
            // TODO: add logger
            return;
        }
        setDiagram({...diagram, shapes: [...diagram.shapes, shape]})
    }, [diagram])

    const removeShape = useCallback((idx: number) => {
        if (!diagram) {
            // TODO: add logger
            return;
        }
        setDiagram({...diagram, shapes: diagram?.shapes.filter((_, i) => i !== idx)})
    }, [])

    const updateSvgContainer = (effect: (svg: Svg) => void) => updateSvg(svgContainer, effect)

    const changeShape = useCallback((shapeToSet: ShapeType, idx: number) => {
        if (!diagram) {
            // TODO: add logger
            return;
        }
        setDiagram({...diagram, shapes: diagram?.shapes.map((shape, i) => idx == i ? shapeToSet : shape)})
    }, []);


    useEffect(() => {
        resetDiagram()
    }, [])

    return (
        <DiagramContext.Provider
        value={{
            diagram: diagram,
            setDiagram: setDiagram,
            resetDiagram: resetDiagram,
            addShape: addShape,
            removeShape: removeShape,
            changeShape: changeShape,
            updateSvgContainer: updateSvgContainer,
        }}
        >
        {children}
        </DiagramContext.Provider>
    );
};