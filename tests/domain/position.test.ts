import { Position } from '../../src/domain/position';

describe('Position', () => {
  test('should create a Position instance with the correct x and y values', () => {
    const position = new Position(2, 3);
    expect(position.x).toBe(2);
    expect(position.y).toBe(3);
  });

  test('copy method should create a new Position instance with the same x and y values', () => {
    const originalPosition = new Position(2, 3);
    const copiedPosition = originalPosition.copy();
    expect(copiedPosition.x).toBe(originalPosition.x);
    expect(copiedPosition.y).toBe(originalPosition.y);
  });

  test('move method should create a new Position instance with the updated x and y values', () => {
    const originalPosition = new Position(2, 3);
    const newPosition = originalPosition.move(1, -1);
    expect(newPosition.x).toBe(3);
    expect(newPosition.y).toBe(2);
  });

  test('toString method should return a string representation of the position', () => {
    const position = new Position(2, 3);
    expect(position.toString()).toBe('(2,3)');
  });

  test('equals method should correctly compare two Position instances', () => {
    const position1 = new Position(2, 3);
    const position2 = new Position(2, 3);
    const position3 = new Position(3, 2);

    expect(position1.equals(position2)).toBe(true);
    expect(position1.equals(position3)).toBe(false);
  });
});