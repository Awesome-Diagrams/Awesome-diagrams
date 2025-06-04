import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type Diagram = {
  id: number;
  name: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch("http://localhost:8080/diagrams/mine", {
    credentials: "include",
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!res.ok) {
    throw new Error("Не удалось загрузить диаграммы");
  }

  const diagrams = await res.json();
  return json(diagrams);
}

export default function MyDiagramsPage() {
  const diagrams = useLoaderData<Diagram[]>();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Мои диаграммы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {diagrams.map((diagram) => (
          <Link
            key={diagram.id}
            to={`/diagram/${diagram.id}`}
            className="block p-4 rounded-lg shadow bg-white border hover:shadow-md transition hover:bg-gray-50"
          >
            <p className="text-lg font-semibold">{diagram.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
