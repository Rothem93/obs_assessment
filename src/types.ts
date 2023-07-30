export type TerrainType = 'Fe' | 'Se' | 'W' | 'Si' | 'Zn' | 'Obs';

export const backOffStrategies: string[][] = [
  ['E', 'R', 'F'],
  ['E', 'L', 'F'],
  ['E', 'L', 'L', 'F'],
  ['E', 'B', 'R', 'F'],
  ['E', 'B', 'B', 'L', 'F'],
  ['E', 'F', 'F'],
  ['E', 'F', 'L', 'F', 'L', 'F'],
];