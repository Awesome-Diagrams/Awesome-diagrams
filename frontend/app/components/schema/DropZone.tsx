interface DropZoneProps {
  title: string;
  items: string[];
  onDrop: (item: string) => void;
  onRemove: (item: string) => void;
}

export const DropZone = ({ title, items, onDrop, onRemove }: DropZoneProps) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const shape = e.dataTransfer.getData("shape");
    const connector = e.dataTransfer.getData("connector");
    if (shape) onDrop(shape);
    if (connector) onDrop(connector);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className="border-2 border-dashed p-4 rounded min-h-[100px]"
    >
      <p className="font-medium mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
          >
            {item}
            <button onClick={() => onRemove(item)} className="text-red-500">×</button>
          </div>
        ))}
      </div>
    </div>
  );
};
