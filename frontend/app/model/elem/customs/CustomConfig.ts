
export interface CustomConfig {
    stroke?: {
        color: string; 
        width: number; 
        dasharray?: string;
    };
    fill?: {
        color: string;
        gradient?: {
            enabled: boolean; 
            secondColor: string;
        };
    };
    opacity?: number;
}
