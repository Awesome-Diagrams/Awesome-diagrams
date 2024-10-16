import { Svg, Element } from "@svgdotjs/svg.js";
import { useState, useRef, useEffect, useLayoutEffect } from 'react';

export const useSvgContainer = () => {
  const [handles, setHandle] = useState<SvgContainerHandle>();
  return { setHandle, svgContainer: handles };
};

export type SvgContainerHandle = {
  svg: Svg;
  container: HTMLDivElement;
}

export const updateSvg = (
  container: SvgContainerHandle | undefined,
  effect: (svg: Svg) => void
) => () => effect(container!.svg);

export const useSvg = (
  container: SvgContainerHandle | undefined,
  effect: (svg: Svg) => Element[],
  deps: any[]
) => {
  const callbackRef = useRef(effect);

  useLayoutEffect(() => {
    callbackRef.current = effect;
  }, [effect]);

  useEffect(() => {
    let objs: Element[] = [];
    const current = callbackRef.current;
    if (current && container) objs = current(container.svg) || [];
    return () => objs.forEach((obj) => obj.remove());
  }, [...deps, container]);
};

