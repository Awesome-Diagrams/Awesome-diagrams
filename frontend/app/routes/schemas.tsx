import { useState } from "react";
import { ConnectionRule, CustomSchema } from "~/model/schema/CustomSchema";
import { AvailableShapeList, AvailableConnectorList } from "~/components/schema/AvailableLists";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ShapeType } from "~/model/DiagramSerialized";
import { ConnectorType } from "~/model/elem/ConnectorType";
import { RulesEditor } from "~/components/schema/RulesEditor";
import { Card } from "~/components/ui/card";
import { useUser } from "~/hooks/useUser";
import { useNavigate } from "@remix-run/react";

export default function SchemasPage() {
  const [name, setName] = useState("");
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [connectors, setConnectors] = useState<ConnectorType[]>([]);
  const [rules, setRules] = useState<ConnectionRule[]>([]);
  const user = useUser();
  const navigate = useNavigate()

  const handleExport = async () => {
    if (!user) {
      alert("Не удалось получить пользователя");
      return;
    }

    try {
      const resId = await fetch(`http://localhost:8080/idByUsername?username=${user.username}`, {
        credentials: "include",
      });
      const data = await resId.json();
      const ownerId = data.id;

      if (!ownerId) {
        alert("Не удалось получить ID пользователя");
        return;
      }

      const schema = new CustomSchema(name, shapes, connectors, rules);
      const jsonData = schema.toJSON();

      const response = await fetch("http://localhost:8080/schemas/save", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          data: jsonData,
          ownerId: ownerId,
        }),
      });

      if (response.ok) {
        alert("Схема успешно сохранена!");
        navigate(`/diagram`)
      } else {
        console.log(response)
        alert("Ошибка при сохранении схемы");
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при сохранении");
    }
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
        <Button onClick={handleExport}>Сохранить схему</Button>
      </div>
    </div>
  );
}
