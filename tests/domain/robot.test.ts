import { MarsSurveillanceRobot } from '../../src/domain/robot';
import { Terrain } from '../../src/domain/terrain';
import { TerrainType } from '../../src/types';

describe('MarsSurveillanceRobot', () => {
  const terrainMap: TerrainType[][] = [
    ['Fe', 'Fe', 'Se'],
    ['W', 'Si', 'Obs'],
    ['W', 'Obs', 'Zn'],
  ];
  const initialBattery = 50;
  const startX = 0;
  const startY = 0;
  const facing = 'East';

  test('should run simulation and get correct results', () => {
    const terrain = new Terrain(terrainMap);
    const robot = new MarsSurveillanceRobot(terrain, startX, startY, initialBattery, facing);

    const commands = ['F', 'S', 'R', 'F', 'S', 'R', 'F', 'L', 'F', 'S'];
    robot.run(commands);

    const expectedResults = {
      visitedCells: [
        { _x: 0, _y: 0 },
        { _x: 1, _y: 0 },
        { _x: 1, _y: 1 },
        { _x: 0, _y: 1 },
        { _x: 0, _y: 2 },
      ],
      samplesCollected: ['Fe', 'Si', 'W'],
      currentBattery: 8,
      finalPosition: {
        Location: { X: 0, Y: 2 },
        Facing: 'South',
      },
    };

    const simulationResults = robot.getSimulationResults();
    expect(simulationResults).toEqual(expectedResults);
  });
  

  test('should run simulation and get correct results but with low battery', () => {
    const terrain = new Terrain(terrainMap);
    const robot = new MarsSurveillanceRobot(terrain, startX, startY, 15, facing);

    const commands = ['F', 'B', 'F', 'S', 'R', 'F', 'S', 'R', 'F', 'L', 'F', 'S'];
    robot.run(commands);

    const expectedResults = {
      visitedCells: [
        { _x: 0, _y: 0 },
        { _x: 1, _y: 0 },
        { _x: 0, _y: 0 },
        { _x: 1, _y: 0 },
      ],
      samplesCollected: ['Fe'],
      currentBattery: 0,
      finalPosition: {
        Location: { X: 1, Y: 0 },
        Facing: 'East',
      },
    };

    const simulationResults = robot.getSimulationResults();
    expect(simulationResults).toEqual(expectedResults);
  });

  test('should return correct results when battery is 0', () => {
    const terrain = new Terrain(terrainMap);
    const robot = new MarsSurveillanceRobot(terrain, startX, startY, 0, facing);

    const commands = ['F', 'S', 'R', 'F', 'S', 'R', 'F', 'L', 'F', 'S'];
    robot.run(commands);

    const expectedResults = {
      visitedCells: [
        { _x: 0, _y: 0 }
      ],
      samplesCollected: [],
      currentBattery: 0,
      finalPosition: {
        Location: { X: 0, Y: 0 },
        Facing: 'East',
      },
    };

    const simulationResults = robot.getSimulationResults();
    expect(simulationResults).toEqual(expectedResults);
  });

  test('should correctly apply backoff strategy', () => {
    const terrain = new Terrain(terrainMap);
    const robot = new MarsSurveillanceRobot(terrain, startX, startY, 20, facing);

    const commands = ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'];
    robot.run(commands);

    const expectedResults = {
      visitedCells: [
        { _x: 0, _y: 0 },
        { _x: 1, _y: 0 },
        { _x: 2, _y: 0 },
        { _x: 2, _y: 2 },
        { _x: 0, _y: 2 },
        { _x: 0, _y: 1 },
        { _x: 0, _y: 0 },
        { _x: 1, _y: 0 },
        { _x: 2, _y: 0 },
        { _x: 2, _y: 2 },
        { _x: 0, _y: 2 }
      ],
      samplesCollected: [],
      currentBattery: 20,
      finalPosition: {
        Location: { X: 0, Y: 2 },
        Facing: 'West',
      },
    };

    const simulationResults = robot.getSimulationResults();
    expect(simulationResults).toEqual(expectedResults);
  });
});