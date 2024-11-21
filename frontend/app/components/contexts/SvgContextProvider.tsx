import { createContext, useCallback, useContext, useEffect } from "react"
import { SVG, Svg } from "@svgdotjs/svg.js";
import { useSvgContainer } from "~/internal/svg/hook/hook";

type SvgContextType = {
    reset: (div: HTMLDivElement) => void
    //update: (effect: (svg: Svg) => void) => void
    svg: Svg | undefined
}

const SvgContext = createContext<SvgContextType | undefined>(undefined);

export const useSvg = () => {
  return useContext(SvgContext);
};

export interface SvgContextProviderProps {
    children: React.ReactNode
}

export const SvgContextProvider = ({ children }: SvgContextProviderProps) => {
    const { setHandle, svgContainer } = useSvgContainer();

    //const update = (effect: (svg: Svg) => void) => updateSvg(svgContainer, effect);

    useEffect(() => {
        setHandle(undefined)
    }, [])

    const reset = useCallback((div: HTMLDivElement) => {
        setHandle({container: div, svg: SVG().addTo(div).size('100%', '100%')})
    }, [])

    return (
        <SvgContext.Provider
            value={{
                reset: reset,
                svg: svgContainer?.svg,
                //update: update
            }}
        >
            {children}
        </SvgContext.Provider>
    );
};