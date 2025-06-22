import { Circle, Ellipse, Path, Polygon, Polyline, Shape } from "@svgdotjs/svg.js";

export const shapeToPath = (shape: Shape) => {
  const type = shape.type;

  switch (type) {
    case 'rect': {
      const x = shape.x();
      const y = shape.y();
      const w = shape.width();
      const h = shape.height();
      return `M${x},${y} H${(x as number) + (w as number)} V${(y as number) + (h as number)} H${x} Z`;
    }

    case 'circle': {
      const cx = shape.cx();
      const cy = shape.cy();
      const r = (shape as Circle).attr('r');
      return `
        M ${cx}, ${cy}
				m ${r}, 0
        a ${r},${r} 0 1,0 ${-2 * r},0
        a ${r},${r} 0 1,0 ${2 * r},0
      `;
    }

    case 'ellipse': {
      const cx = shape.cx();
      const cy = shape.cy();
      const rx = (shape as Ellipse).attr('rx');
      const ry = (shape as Ellipse).attr('ry');

      return `
        M ${cx - rx}, ${cy}
        a ${rx},${ry} 0 1,0 ${2 * rx},0
        a ${rx},${ry} 0 1,0 ${-2 * rx},0
      `.trim();
    }
    case 'line': {
			const delta = 2;
      const x1 = shape.attr('x1');
      const y1 = shape.attr('y1');
      const x2 = shape.attr('x2');
      const y2 = shape.attr('y2');
      return `M${x1} ${y1} L${x1} ${y1 + delta} L${x2} ${y2 + delta} L${x2} ${y2} Z`.trim();
    }

    case 'polygon': {
      const points = (shape as Polygon).array();
      const [first, ...rest] = points;
      let d = `M${first[0]},${first[1]}`;
      rest.forEach(([x, y]) => {
        d += ` L${x},${y}`;
      });
      return d + ' Z';
    }

    case 'polyline': {
      const points = (shape as Polyline).array();
      const [first, ...rest] = points;
      let d = `M${first[0]},${first[1]}`;
      rest.forEach(([x, y]) => {
        d += ` L${x},${y}`;
      });
      return d;
    }

		case 'path': {
			return shape.node.getAttribute('d')!;
		}

    default:
      throw new Error('Unsupported shape type: ' + type);
  }
}
