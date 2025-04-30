import { ShapeType } from "../DiagramSerialized";
import { ConnectorType } from "../elem/ConnectorType";

type ConnectionRule = {
	from: ShapeType[];
	to: ShapeType[];
	connector: ConnectorType;
};

export class CustomSchema {
	name: string;
	availableShapes: ShapeType[];
	availableConnectors: ConnectorType[];
	connectionRules: ConnectionRule[];

	constructor(
		name: string,
		availableShapes: ShapeType[],
		availableConnectors: ConnectorType[],
		connectionRules: ConnectionRule[]
	) {
		this.name = name;
		this.availableShapes = availableShapes;
		this.availableConnectors = availableConnectors;
		this.connectionRules = connectionRules;
	}

	getAvailableShapeTypes(): ShapeType[] {
		return this.availableShapes;
	}

	getAvailableConnectorTypes(): ConnectorType[] {
		return this.availableConnectors;
	}

	validateConnectionBetweenShapes(
		from: ShapeType,
		to: ShapeType,
		connector: ConnectorType
	): boolean {
		return this.connectionRules.length == 0 
			|| this.connectionRules.some(rule =>
			rule.connector === connector &&
			rule.from.includes(from) &&
			rule.to.includes(to)
		);
	}

    toJSON(): string {
		return JSON.stringify({
			name: this.name,
			availableShapes: this.availableShapes,
			availableConnectors: this.availableConnectors,
			connectionRules: this.connectionRules
		});
	}

	static fromJSON(json: string): CustomSchema {
		const data = JSON.parse(json);
		return new CustomSchema(
			data.name,
			data.availableShapes,
			data.availableConnectors,
			data.connectionRules
		);
	}
}
