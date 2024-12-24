import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback } from "react";
import { serializeDiagram } from "~/internal/serialization/DiagramSerializator";
import { useLocation, useNavigate, useParams } from "@remix-run/react";

export const SaveOnlineButton = () => {
    const diagram = useDiagram();
    const location = useLocation();
    const navigate = useNavigate();
    const { diagramId } = useParams();

    const handleSavingDiagram = useCallback(async () => {
        if (!diagram?.diagram) {
            return;
        }

        const diagramData = JSON.stringify(serializeDiagram(diagram.diagram));
        const requestBody = {
            name: "Diagram",
            data: diagramData,
        };

        const url = diagramId
            ? `http://localhost:8080/diagrams/${diagramId}` // URL для обновления
            : `http://localhost:8080/diagrams`; // URL для создания

        const method = "POST"; // Метод запроса

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Ошибка сохранения: ${response.status} ${errorText}`);
            }
            if (method === "POST") {
                const newDiagram = await response.json()
                navigate(`/diagram/${newDiagram.id}`)
            }
            console.log("Диаграмма успешно сохранена");
        } catch (error) {
            console.error("Ошибка при сохранении диаграммы:", error);
        }
    }, [diagram, diagramId, navigate])

    return (
        <Button title="Save" onClick={handleSavingDiagram} className="bg-black text-white">
            Save
        </Button>
    );
};