import { RobotService } from '../../src/application/robot-services';
import { TerrainType } from '../../src/types';

describe('RobotService', () => {
  test('should run simulation and return results', () => {
    const commands = ['F', 'S', 'R', 'F', 'S', 'R', 'F', 'L', 'F', 'S'];
    const terrainMap: TerrainType[][] = [
      ['Fe', 'Fe', 'Se'],
      ['W', 'Si', 'Obs'],
      ['W', 'Obs', 'Zn'],
    ];
    const startX = 0;
    const startY = 0;
    const initialBattery = 50;
    const facing = 'East';

    const robotService = RobotService.getInstance();
    const result = robotService.runSimulationAndGetResults(commands, terrainMap, startX, startY, initialBattery, facing);

    expect(result).toBeDefined();
    expect(result.VisitedCells).toEqual([
      { X: 0, Y: 0 },
      { X: 1, Y: 0 },
      { X: 1, Y: 1 },
      { X: 0, Y: 1 },
      { X: 0, Y: 2 },
    ]);
    expect(result.SamplesCollected).toEqual(['Fe', 'Si', 'W']);
    expect(result.Battery).toBe(8);
    expect(result.FinalPosition).toEqual({
      Location: { X: 0, Y: 2 },
      Facing: 'South',
    });
  });
});