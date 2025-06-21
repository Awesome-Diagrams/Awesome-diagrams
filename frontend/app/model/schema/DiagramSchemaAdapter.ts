// Adapter.ts
import { CustomSchema } from "./CustomSchema";
import { ShapeType } from "../DiagramSerialized";
import { ConnectorType } from "../elem/ConnectorType";
import { DiagramSchemaType } from "../diagram/DiagramSchemaType";


export class DiagramSchemaAdapter {
    private diagramType: DiagramSchemaType;

    constructor(diagramType: DiagramSchemaType) {
        this.diagramType = diagramType;
    }

    public getCustomSchema(): CustomSchema {
        switch (this.diagramType) {
            case "block":
                return new CustomSchema(
                    "block",
                    [ShapeType.Circle, ShapeType.Ellipse, ShapeType.Rect, ShapeType.Square],
                    ["polyline"],
                    [
                        {
                            from: [ShapeType.Circle, ShapeType.Rect],
                            to: [ShapeType.Ellipse],
                            connector: "polyline"
                        }
                    ]
                );
            case "free":
                return new CustomSchema(
                    "free",
                    Object.values(ShapeType),
                    ["polyline", "straight", "aggregation", "association", "composition", "dependency", "inheritance"],
                    []
                );
            case "uml-class":
                return new CustomSchema(
                    "uml-class",
                    [ShapeType.Ellipse, ShapeType.UMLActor, ShapeType.UMLClass, ShapeType.UMLInterface],
                    ["aggregation", "association", "composition", "dependency", "inheritance"],
                    []
                );
            default:
                throw new Error("Unknown legacy schema type");
        }
    }
}
