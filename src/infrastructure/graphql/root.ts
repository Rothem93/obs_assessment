import { TerrainType } from '../../types';
import { RobotService } from '../../application/robot-services';

const root = {
  runSimulation: (args: any) => {
    const { terrain, battery, commands, initialPosition } = args;

    if (!terrain || !Array.isArray(terrain) || !terrain.length || !Array.isArray(terrain[0]) || 
        !terrain[0].length || isNaN(battery) || !Array.isArray(commands) || !commands.length || !initialPosition) {
        throw new Error('Invalid input data. Please provide valid terrain, battery, commands, and initialPosition.');
    }

    const robotService = RobotService.getInstance();
    const terrainMap: TerrainType[][] = terrain.map(row => row.map(cell => cell as TerrainType));
    const startX = initialPosition.location.x;
    const startY = initialPosition.location.y;
    const initialBattery = battery;
    const facing = initialPosition.facing;
    const result = robotService.runSimulationAndGetResults(commands, terrainMap, startX, startY, initialBattery, facing);
    return result;
  },
};

export default root;