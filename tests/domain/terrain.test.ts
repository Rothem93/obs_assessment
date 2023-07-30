import { Terrain } from '../../src/domain/terrain';
import { TerrainType } from '../../src/types';
describe('Terrain', () => {
    const terrainMap: TerrainType[][] = [
      ['Fe', 'Fe', 'Se'],
      ['W', 'Si', 'Obs'],
      ['W', 'Obs', 'Zn'],
    ];
  
    test('should get terrain at specific position', () => {
      const terrain = new Terrain(terrainMap);
  
      expect(terrain.getTerrainAt(0, 0)).toBe('Fe');
      expect(terrain.getTerrainAt(1, 1)).toBe('Si');
      expect(terrain.getTerrainAt(2, 2)).toBe('Zn');
    });
  
    test('should throw an error when getting terrain at out of bounds position', () => {
      const terrain = new Terrain(terrainMap);
  
      expect(() => terrain.getTerrainAt(-1, 0)).toThrow('Out of terrain.');
      expect(() => terrain.getTerrainAt(0, 3)).toThrow('Out of terrain.');
      expect(() => terrain.getTerrainAt(3, 1)).toThrow('Out of terrain.');
    });
  
    test('should check if a position is an obstacle', () => {
      const terrain = new Terrain(terrainMap);
  
      expect(terrain.isObstacle(0, 0)).toBe(false);
      expect(terrain.isObstacle(2, 2)).toBe(false);
      expect(terrain.isObstacle(1, 2)).toBe(true);
      expect(terrain.isObstacle(2, 1)).toBe(true);
      expect(terrain.isObstacle(3, 3)).toBe(true);
    });
  
    test('should get the width and height of the terrain', () => {
      const terrain = new Terrain(terrainMap);
  
      expect(terrain.getWidth()).toBe(3);
      expect(terrain.getHeight()).toBe(3);
    });
  });