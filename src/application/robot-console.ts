import fs from 'fs';
import { RobotService } from './robot-services';
import { SimulationResultDTO } from './DTO/simulation-result.dto';

export async function runRobotFromInputFiles(inputFile: string, outputFile: string) {
  try {
    const inputData = await fs.promises.readFile(inputFile, 'utf-8');
    const { commands, terrain, battery, initialPosition } = JSON.parse(inputData);

    const { x: startX, y: startY } = initialPosition.location;

    const facing = initialPosition.facing;

    const robotService = RobotService.getInstance();
    const result: SimulationResultDTO = robotService.runSimulationAndGetResults(commands, terrain, startX, startY, battery, facing);

    await fs.promises.writeFile(outputFile, JSON.stringify(result, null, 2));
    console.log('Simulation completed. Result saved in:', outputFile);
    process.exit(1);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
