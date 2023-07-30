export interface SimulationResultDTO {
    VisitedCells: { X: number; Y: number }[];
    SamplesCollected: string[];
    Battery: number;
    FinalPosition: {
        Location: { X: number; Y: number };
        Facing: 'North' | 'East' | 'South' | 'West';
    };
}