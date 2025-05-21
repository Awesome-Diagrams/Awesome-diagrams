import { ShapeType } from "../DiagramSerialized";
import { ConnectorType } from "../elem/ConnectorType";

export type DiagramSchemaType = "free" | "block" | "custom";

export const getAvailableShapeTypes = (type: DiagramSchemaType): ShapeType[] => {
	switch (type) {
		case 'block': {
			return [ShapeType.Circle, ShapeType.Ellipse, ShapeType.Rect, ShapeType.Square];
		}
		case 'free': {
			return Object.values(ShapeType)
		}
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
			return ["polyline", "straight"];
		}
		default: {
			throw "Not suppot type of diagram";
		}
	}
}