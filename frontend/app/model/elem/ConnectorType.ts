
export type ConnectorType = 'straight' | 'polyline'

export const getInternalPointCount = (connectorType: ConnectorType): number => {
	switch(connectorType) {
		case 'polyline': {
			return 1;
		}
		case 'straight': {
			return 0;
		}
		default: {
			throw `Unkown type of connector ${connectorType}`;
		}
	}
}