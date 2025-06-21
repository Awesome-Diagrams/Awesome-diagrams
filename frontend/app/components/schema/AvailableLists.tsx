import { ShapeType } from "~/model/DiagramSerialized";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { ConnectorPalette, ShapePalette } from "./Palletes";
import { DropZone } from "./DropZone";

interface ListProps<T> {
  selected: T[];
  onChange: (updated: T[]) => void;
}

export const AvailableShapeList = ({ selected, onChange }: ListProps<ShapeType>) => {
  const handleDrop = (item: string) => {
    if (!selected.includes(item as ShapeType)) {
      onChange([...selected, item as ShapeType]);
    }
  };

  const handleRemove = (item: string) => {
    onChange(selected.filter(s => s !== item));
  };

  return (
    <div>
      <ShapePalette />
      <DropZone
        title="Выбранные фигуры"
        items={selected}
        onDrop={handleDrop}
        onRemove={handleRemove}
      />
    </div>
  );
};

export const AvailableConnectorList = ({ selected, onChange }: ListProps<ConnectorType>) => {
  const handleDrop = (item: string) => {
    if (!selected.includes(item as ConnectorType)) {
      onChange([...selected, item as ConnectorType]);
    }
  };

  const handleRemove = (item: string) => {
    onChange(selected.filter(c => c !== item));
  };

  return (
    <div>
      <ConnectorPalette />
      <DropZone
        title="Выбранные коннекторы"
        items={selected}
        onDrop={handleDrop}
        onRemove={handleRemove}
      />
    </div>
  );
};
