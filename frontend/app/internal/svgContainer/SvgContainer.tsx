import { useRef, useEffect, CSSProperties } from 'react';
import { SVG, Svg } from "@svgdotjs/svg.js";
import { SvgContainerHandle } from './hook';

export const SvgContainer = (props: SvgContainerProps) => {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapper && wrapper.current) {
      if (wrapper.current.children.length === 0) {
        const svg = SVG().addTo(wrapper.current).size('100%', '100%');
        props.setHandle({ svg, container: wrapper.current });
        props.onload?.(svg, wrapper.current);
      }
    }
  }, [wrapper, props]);

  const style: CSSProperties = {
  };
  if (props.margin) {
    style.margin = props.margin;
  }
  if (props.height) {
    style.height = props.height;
  }
  if (props.width) {
    style.width = props.width;
  }

  return <div ref={wrapper} style={style} />;
}

export interface SvgContainerProps {
  height?: string;
  width?: string;
  margin?: string;
  onload?: (svg: Svg, container: HTMLDivElement) => void;
  setHandle: (handles: SvgContainerHandle) => void;
}