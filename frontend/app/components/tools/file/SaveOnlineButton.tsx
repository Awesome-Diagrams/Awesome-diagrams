import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useState } from "react";
import { serializeDiagram } from "~/internal/serialization/DiagramSerializator";
import { useLocation, useNavigate, useParams } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";
import * as Dialog from "@radix-ui/react-dialog";

export const SaveOnlineButton = () => {
    const diagram = useDiagram();
    const location = useLocation();
    const navigate = useNavigate();
    const { diagramId } = useParams();
    const user = useUser();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [diagramName, setDiagramName] = useState("My Diagram");

    const handleSavingDiagram = useCallback(async () => {
        if (!diagram?.diagram || !user) return;

        const diagramData = JSON.stringify(serializeDiagram(diagram.diagram));
        const requestBody = {
            name: diagramName,
            data: diagramData,
            ownerId: user.id,
        };

        const url = diagramId
            ? `http://localhost:8080/diagrams/by-id/${diagramId}`
            : `http://localhost:8080/diagrams`;

        const method = "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Ошибка сохранения: ${response.status} ${errorText}`);
            }

            const savedDiagram = await response.json();

            if (!diagramId) {
                navigate(`/diagram/${savedDiagram.id}`);
            }

            console.log("Диаграмма успешно сохранена");
            setIsDialogOpen(false); // Закрываем диалог
        } catch (error) {
            console.error("Ошибка при сохранении диаграммы:", error);
        }
    }, [diagram, diagramId, navigate, user, diagramName]);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <Button className="bg-black text-white">Save</Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 space-y-4">
                    <Dialog.Title className="text-lg font-bold">Save Diagram</Dialog.Title>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        placeholder="Diagram name"
                        value={diagramName}
                        onChange={(e) => setDiagramName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                        </Dialog.Close>
                        <Button onClick={handleSavingDiagram}>Save</Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
