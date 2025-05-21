import { useState } from "react";
import { ConnectionRule } from "~/model/schema/CustomSchema";
import { ShapeType } from "~/model/DiagramSerialized";
import { ConnectorType } from "~/model/elem/ConnectorType";

interface RulesEditorProps {
  shapes: ShapeType[];
  connectors: ConnectorType[];
  rules: ConnectionRule[];
  setRules: (rules: ConnectionRule[]) => void;
}

export const RulesEditor = ({ shapes, connectors, rules, setRules }: RulesEditorProps) => {
  const [from, setFrom] = useState<ShapeType[]>([]);
  const [to, setTo] = useState<ShapeType[]>([]);
  const [connector, setConnector] = useState<ConnectorType | "">("");

  const handleSelect = (
    value: string,
    current: ShapeType[],
    setter: (val: ShapeType[]) => void
  ) => {
    const exists = current.includes(value as ShapeType);
    if (exists) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value as ShapeType]);
    }
  };

  const handleAddRule = () => {
    if (from.length === 0 || to.length === 0 || !connector) return;
    const rule: ConnectionRule = {
      from,
      to,
      connector: connector as ConnectorType,
    };
    setRules([...rules, rule]);
    setFrom([]);
    setTo([]);
    setConnector("");
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Правила соединений</h2>

      <div className="mb-2">
        <p className="font-medium">Откуда (from)</p>
        <div className="flex flex-wrap gap-2">
          {shapes.map(s => (
            <button
              key={s}
              onClick={() => handleSelect(s, from, setFrom)}
              className={`px-2 py-1 rounded border ${from.includes(s) ? "bg-blue-300" : "bg-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <p className="font-medium">Коннектор</p>
        <select value={connector} onChange={e => setConnector(e.target.value)} className="border p-1 rounded">
          <option value="">Выберите</option>
          {connectors.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <p className="font-medium">Куда (to)</p>
        <div className="flex flex-wrap gap-2">
          {shapes.map(s => (
            <button
              key={s}
              onClick={() => handleSelect(s, to, setTo)}
              className={`px-2 py-1 rounded border ${to.includes(s) ? "bg-green-300" : "bg-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button onClick={handleAddRule} className="bg-blue-500 text-white px-4 py-1 rounded mt-2">
        Добавить правило
      </button>

      <ul className="list-disc ml-5 mt-4">
        {rules.map((rule, idx) => (
          <li key={idx}>
            {rule.from.join(", ")} —(<strong>{rule.connector}</strong>)→ {rule.to.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};
