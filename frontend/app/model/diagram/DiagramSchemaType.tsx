import { ShapeType } from "../DiagramSerialized";
import { ConnectorType } from "../elem/ConnectorType";

export type DiagramSchemaType = "free" | "block" | "uml-class" | "custom";

export const getAvailableShapeTypes = (type: DiagramSchemaType): ShapeType[] => {
	switch (type) {
		case 'block': {
			return [ShapeType.Circle, ShapeType.Ellipse, ShapeType.Rect, ShapeType.Square];
		}
		case 'free': {
			return Object.values(ShapeType)
		}
		case "uml-class":
			return [ShapeType.Ellipse, ShapeType.UMLActor, ShapeType.UMLClass, ShapeType.UMLInterface];
		default: {
			throw "Not suppot type of diagram";
		}
	}
}

export const getAvailableConnectorType = (type: DiagramSchemaType): ConnectorType[] => {
	switch (type) {
		case 'block': {
			return ["polyline"];
		}
		case 'free': {
            return [
                "polyline",
                "straight",
                "inheritance",
                "aggregation",
                "composition",
                "association",
                "dependency"
            ];
        }
        case 'uml-class': {
            return [
                "inheritance",
                "aggregation",
                "composition",
                "association",
                "dependency"
            ];
        }

		default: {
			throw "Not suppot type of diagram";
		}
	}
}