import { Direction } from '../../src/domain/direction';

describe('Direction', () => {
  test('should transform map value to direction name', () => {
    expect(Direction.transformMapToDirection('N')).toBe('North');
    expect(Direction.transformMapToDirection('E')).toBe('East');
    expect(Direction.transformMapToDirection('S')).toBe('South');
    expect(Direction.transformMapToDirection('W')).toBe('West');
  });

  test('should throw an error when transforming invalid map value to direction name', () => {
    expect(() => Direction.transformMapToDirection('Invalid')).toThrow(
      'Invalid map value: Invalid'
    );
  });

  test('should transform direction name to map value', () => {
    expect(Direction.transformDirectionToMap('North')).toBe('N');
    expect(Direction.transformDirectionToMap('East')).toBe('E');
    expect(Direction.transformDirectionToMap('South')).toBe('S');
    expect(Direction.transformDirectionToMap('West')).toBe('W');
  });

  test('should throw an error when transforming invalid direction name to map value', () => {
    expect(() => Direction.transformDirectionToMap('Invalid')).toThrow(
      'Invalid direction value: Invalid'
    );
  });
});