import { Button } from "~/components/ui/button";
import { useDiagram } from "~/components/contexts/DiagramContextProvider";
import { useCallback, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { useUser } from "~/hooks/useUser";
import { serializeElem } from "~/internal/serialization/DiagramSerializator";
import * as Dialog from "@radix-ui/react-dialog";

export const SaveCombinedShapeButton = () => {
    const diagram = useDiagram();
    const selectedShapes = diagram?.diagram?.getSelectionController().getSelectedShapes();
    const user = useUser();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [shapeName, setShapeName] = useState("Combined shape");

    const handleSavingShape = useCallback(async () => {
        if (!selectedShapes?.length || selectedShapes?.length !== 1) return;

        const shapeData = JSON.stringify(serializeElem(selectedShapes[0]));
        const requestBody = {
            name: shapeName,
            data: shapeData,
            ownerId: user?.id ?? 0,
        };

        const url = `http://localhost:8080/combined-shape/save`

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

            await response.json();

            console.log("Shape успешно сохранён");
        } catch (error) {
            console.error("Ошибка при сохранении shape:", error);
        }
    }, [diagram, user, shapeName]);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger asChild>
                <Button className="bg-black text-white">Save combined shape</Button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 space-y-4">
                    <Dialog.Title className="text-lg font-bold">Save Shape</Dialog.Title>
                    <input
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        type="text"
                        placeholder="Shape name"
                        value={shapeName}
                        onChange={(e) => setShapeName(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                        </Dialog.Close>
                        <Button onClick={handleSavingShape}>Save</Button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
