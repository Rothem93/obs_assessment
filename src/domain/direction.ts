type DirectionValue = 'N' | 'E' | 'S' | 'W';
type DirectionName = 'North' | 'East' | 'South' | 'West';
export class Direction {
  static transformMapToDirection(map: String): DirectionName {
    switch (map) {
      case "N":
        return 'North';
      case "E":
        return 'East';
      case "S":
        return 'South';
      case "W":
        return 'West';
      default:
        throw new Error(`Invalid map value: ${map}`);
    }
  }

  static transformDirectionToMap(direction: String): DirectionValue {
    switch (direction) {
      case 'North':
        return "N";
      case 'East':
        return "E";
      case 'South':
        return "S";
      case 'West':
        return "W";
      default:
        throw new Error(`Invalid direction value: ${direction}`);
    }
  }
}