import { useState } from "react";
import { ConnectionRule, CustomSchema } from "~/model/schema/CustomSchema";
import { AvailableShapeList, AvailableConnectorList } from "~/components/schema/AvailableLists";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ShapeType } from "~/model/DiagramSerialized";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { RulesEditor } from "~/components/schema/RulesEditor";
import { Card } from "~/components/ui/card";

export default function SchemasPage() {
  const [name, setName] = useState("");
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [connectors, setConnectors] = useState<ConnectorType[]>([]);
  const [rules, setRules] = useState<ConnectionRule[]>([]);

  const handleExport = () => {
    const schema = new CustomSchema(name, shapes, connectors, rules);
    const json = schema.toJSON();
    console.log("Exported Schema:", json);
    alert("Схема экспортирована в консоль как JSON");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Создание кастомной схемы</h1>

      <Card className="p-4 mb-4">
        <label className="block mb-2 font-semibold">Название схемы</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите название схемы" />
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <AvailableShapeList selected={shapes} onChange={setShapes} />
        <AvailableConnectorList selected={connectors} onChange={setConnectors} />
      </div>

      <div className="mt-6">
        <RulesEditor shapes={shapes} connectors={connectors} rules={rules} setRules={setRules} />
      </div>

      <div className="mt-6">
        <Button onClick={handleExport}>Экспортировать как JSON</Button>
      </div>
    </div>
  );
}