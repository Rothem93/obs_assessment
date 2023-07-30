import { TerrainType } from '../types';

export class Terrain {
    private terrainMap: TerrainType[][];

    constructor(terrainMap: TerrainType[][]) {
        this.terrainMap = terrainMap;
    }

    public getTerrainAt(x: number, y: number): TerrainType {
        if (x < 0 || x >= this.terrainMap[0].length || y < 0 || y >= this.terrainMap.length) {
            throw new Error('Out of terrain.');
        }

        return this.terrainMap[y][x];
    }

    public isObstacle(x: number, y: number): boolean {
        try {
            return this.getTerrainAt(x, y) === 'Obs';
        } catch {
            return true;
        }
    }

    public getWidth(): number {
        return this.terrainMap[0].length;
    }

    public getHeight(): number {
        return this.terrainMap.length;
    }
}