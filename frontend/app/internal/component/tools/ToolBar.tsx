import { SvgContainerHandle, updateSvg } from "~/internal/svg/svgContainer/hook";
import { Button } from "~/components/ui/button";
import { Box, Circle, Rect, Ellipse } from "@svgdotjs/svg.js";
import { SvgShapeDraggable } from "~/internal/svg/svgShape/svgShapeDraggable";
import { SquarePlus, Triangle, Circle as CircleIcon, RectangleHorizontal, Square, Unlink2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface DiagramProps {
  svgContainer: SvgContainerHandle | undefined;
}

export const ToolBar = ({ svgContainer }: DiagramProps) => {
  const constraints = new Box(0, 0, 1080, 720);

  const addCircle = updateSvg(svgContainer, (svg) => {
    const shape = new Circle({ r: 50, cx: 100, cy: 100 });
    new SvgShapeDraggable(shape, svg, constraints);
  });

  const addSquare = updateSvg(svgContainer, (svg) => {
    const shape = new Rect({ width: 100, height: 100, x: 100, y: 100 });
    new SvgShapeDraggable(shape, svg, constraints);
  });

  const addRectangle = updateSvg(svgContainer, (svg) => {
    const shape = new Rect({ width: 140, height: 90, x: 100, y: 100 });
    new SvgShapeDraggable(shape, svg, constraints);
  });

  const addOval = updateSvg(svgContainer, (svg) => {
    const shape = new Ellipse({ cx: 100, cy: 100, rx: 100, ry: 50 });
    new SvgShapeDraggable(shape, svg, constraints);
  });

  const addTriangle = updateSvg(svgContainer, (svg) => {
    const sideLength = 100;
    const height = (Math.sqrt(3) / 2) * sideLength;
    const x = 100;
    const y = 100;
    const points = `${x},${y} ${x - sideLength / 2},${y + height} ${x + sideLength / 2},${y + height}`;
    const shape = svg.polygon(points);
    new SvgShapeDraggable(shape, svg, constraints);
  });

  return (
    <div className="outline rounded-md ml-10">
      <div className="flex w-20 flex-col justify-center gap-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button title="Add Shape">
              <SquarePlus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={addCircle}>
              <CircleIcon className="mr-2 h-4 w-4" />
              <span>Circle</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={addOval}>
              <Unlink2 className="mr-2 h-4 w-4" />
              <span>Oval</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={addSquare}>
              <Square className="mr-2 h-4 w-4" />
              <span>Square</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={addRectangle}>
              <RectangleHorizontal className="mr-2 h-4 w-4" />
              <span>Rectangle</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={addTriangle}>
              <Triangle className="mr-2 h-4 w-4" />
              <span>Triangle</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
