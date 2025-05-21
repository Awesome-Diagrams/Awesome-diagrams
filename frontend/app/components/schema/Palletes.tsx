import { ShapeType } from "~/model/DiagramSerialized";
import { ConnectorType } from "~/model/elem/ConnectorType";

export const ShapePalette = () => {
  const shapes = Object.values(ShapeType);
  return (
    <div className="border p-2 rounded">
      <p className="font-semibold mb-1">Доступные фигуры</p>
      <div className="flex flex-wrap gap-2">
        {shapes.map(shape => (
          <div
            key={shape}
            draggable
            onDragStart={e => e.dataTransfer.setData("shape", shape)}
            className="bg-blue-100 px-2 py-1 rounded cursor-move"
          >
            {shape}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ConnectorPalette = () => {
  const connectors: ConnectorType[] = ["polyline", "straight"];
  return (
    <div className="border p-2 rounded">
      <p className="font-semibold mb-1">Доступные коннекторы</p>
      <div className="flex flex-wrap gap-2">
        {connectors.map(conn => (
          <div
            key={conn}
            draggable
            onDragStart={e => e.dataTransfer.setData("connector", conn)}
            className="bg-green-100 px-2 py-1 rounded cursor-move"
          >
            {conn}
          </div>
        ))}
      </div>
    </div>
  );
};