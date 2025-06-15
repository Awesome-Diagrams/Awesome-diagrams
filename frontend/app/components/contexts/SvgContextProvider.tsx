import { createContext, useCallback, useContext, useEffect } from "react"
import { Svg } from "@svgdotjs/svg.js";
import { useSvgContainer } from "~/internal/svg/hook/hook";

type SvgContextType = {
    reset: (svg: Svg, div: HTMLDivElement) => void
    svg: Svg | undefined
    clear: () => void;
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

    useEffect(() => {
        setHandle(undefined)
    }, [setHandle])

    const reset = useCallback((svg: Svg, div: HTMLDivElement) => {
        if (div.childElementCount === 1 && div.children[0].tagName !== 'H1') {
            div.removeChild(div.lastChild!)
        }
        svg.addTo(div)
        setHandle({container: div, svg: svg})
    }, [setHandle])

    const clear = useCallback(() => setHandle(undefined), []);

    return (
        <SvgContext.Provider
            value={{
                reset: reset,
                svg: svgContainer?.svg,
                clear: clear,
            }}
        >
            {children}
        </SvgContext.Provider>
    );
};