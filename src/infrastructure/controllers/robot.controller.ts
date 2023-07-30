import { Request, Response } from 'express';
import { RobotService } from '../../application/robot-services';
import { TerrainType } from '../../types';
import { SimulationResultDTO } from '../../application/DTO/simulation-result.dto';

export class RobotController {
  public static async runSimulation(req: Request, res: Response): Promise<void> {
        const { terrain, battery, commands, initialPosition } = req.body;

        if (!terrain || !Array.isArray(terrain) || !terrain.length || !Array.isArray(terrain[0]) || !terrain[0].length ||
            isNaN(battery) || !Array.isArray(commands) || !commands.length || !initialPosition) {
            res.status(400).json({ error: 'Invalid Parameters.' });
            return;
        }

        try {
            const terrainMap: TerrainType[][] = terrain.map(row => row.map(cell => cell as TerrainType));
            const startX = initialPosition.location.x;
            const startY = initialPosition.location.y;
            const initialBattery = battery;
            const facing = initialPosition.facing;

            const robotService = RobotService.getInstance();
            const result:SimulationResultDTO = robotService.runSimulationAndGetResults(commands, terrainMap, startX, startY, initialBattery, facing);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
