import { MarsSurveillanceRobot } from '../domain/robot';
import { TerrainType } from '../types';
import { Terrain } from '../domain/terrain';
import { SimulationResultDTO } from './DTO/simulation-result.dto';
export class RobotService {
    private static instance: RobotService;
  
    private constructor() {}
  
    public static getInstance(): RobotService {
      if (!RobotService.instance) {
        RobotService.instance = new RobotService();
      }
      return RobotService.instance;
    }
  
    public runSimulationAndGetResults(
      commands: string[],
      terrainMap: TerrainType[][],
      startX: number,
      startY: number,
      initialBattery: number,
      facing: string
    ): SimulationResultDTO {
      const terrain = new Terrain(terrainMap);
      const robot = new MarsSurveillanceRobot(terrain, startX, startY, initialBattery, facing);
      
      robot.run(commands);

      let results = robot.getSimulationResults();

      let response: SimulationResultDTO = {
        VisitedCells: results.visitedCells.map((position) => ({
          X: position.x,
          Y: position.y,
        })),
        SamplesCollected: results.samplesCollected,
        Battery: results.currentBattery,
        FinalPosition: results.finalPosition
      }
  
      return response;
    }
  }