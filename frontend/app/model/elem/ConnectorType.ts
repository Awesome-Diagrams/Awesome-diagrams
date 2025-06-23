export type ConnectorType = 'straight' | 'polyline' | 'inheritance' | 'aggregation' | 'composition' | 'association' | 'dependency';

export const getInternalPointCount = (connectorType: ConnectorType): number => {
    switch(connectorType) {
        case 'polyline': {
            return 1;
        }
        case 'straight':
        case 'inheritance':
        case 'aggregation':
        case 'composition':
        case 'association':
        case 'dependency': {
            return 0;
        }
        default: {
            const exhaustiveCheck: never = connectorType;
            throw new Error(`Unknown type of connector ${exhaustiveCheck}`);
        }
    }
}