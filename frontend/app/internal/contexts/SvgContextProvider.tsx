import { createContext, Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from "react"
import { updateSvg, useSvgContainer } from "../svg/svgContainer/hook";
import { Svg } from "@svgdotjs/svg.js";

type SvgContextType = {
    reset: (div: HTMLDivElement) => void
    update: (effect: (svg: Svg) => void) => void
    svg: Svg | undefined
}

const SvgContext = createContext<SvgContextType | undefined>(undefined);

export const useSvg = () => {
  return useContext(SvgContext);
};

export const SvgContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { setHandle, svgContainer } = useSvgContainer();

    const update = (effect: (svg: Svg) => void) => updateSvg(svgContainer, effect);

    useEffect(() => {
        setHandle(undefined)
    }, [])

    const reset = useCallback((div: HTMLDivElement) => {
        setHandle({container: div, svg: new Svg()})
    }, [])

    return (
        <SvgContext.Provider
        value={{
            reset: reset,
            svg: svgContainer?.svg,
            update: update
        }}
        >
         {children}
        </SvgContext.Provider>
    );
};