import { TerrainType, backOffStrategies } from '../types';
import { Terrain } from './terrain';
import { Direction } from './direction';
import { Position } from './position';
import { BatteryCapacity } from './battery-capacity';


export class MarsSurveillanceRobot {
  private facing: string;
  private visitedCells: Position[];
  private samplesCollected: TerrainType[];
  private battery: BatteryCapacity;
  private position: Position;

  constructor(private terrain: Terrain, startX: number, startY: number, initialBattery: number, facing: string) {
    this.battery = new BatteryCapacity(initialBattery);
    this.position = new Position(startX, startY);
    this.facing = Direction.transformDirectionToMap(facing);
    this.visitedCells = [];
    this.samplesCollected = [];
  }

  private applyBackOffStrategy(strategy: string[]): void {
    for (const command of strategy) {
      this.executeCommand(command);
      if (!this.isObstacleAhead()) {
        break;
      }
    }
  }

  private isObstacleAhead(): boolean {
    const { x, y } = this.position;

    switch (this.facing) {
      case 'N':
        return y === 0 || this.terrain.isObstacle(x, y - 1);
      case 'E':
        return x === this.terrain.getWidth() - 1 || this.terrain.isObstacle(x + 1, y);
      case 'S':
        return y === this.terrain.getHeight() - 1 || this.terrain.isObstacle(x, y + 1);
      case 'W':
        return x === 0 || this.terrain.isObstacle(x - 1, y);
      default:
        return false;
    }
  }

  private executeCommand(command: string): void {
    if (this.battery.value <= 0) {
      return;
    }

    switch (command) {
      case 'F':
        this.moveForward();
        break;
      case 'B':
        this.moveBackwards();
        break;
      case 'L':
        this.turnLeft();
        break;
      case 'R':
        this.turnRight();
        break;
      case 'S':
        this.takeSample();
        break;
      case 'E':
        this.extendSolarPanels();
        break;
    }
  }

  private moveForward(): void {
    this.consumeBattery(3);
    switch (this.facing) {
      case 'N':
        this.position = this.position.move(0, -1);
        break;
      case 'E':
        this.position = this.position.move(1, 0);
        break;
      case 'S':
        this.position = this.position.move(0, 1);
        break;
      case 'W':
        this.position = this.position.move(-1, 0);
        break;
    }
  }

  private moveBackwards(): void {
    this.consumeBattery(3);
    switch (this.facing) {
      case 'N':
        this.position = this.position.move(0, 1);
        break;
      case 'E':
        this.position = this.position.move(-1, 0);
        break;
      case 'S':
        this.position = this.position.move(0, -1);
        break;
      case 'W':
        this.position = this.position.move(1, 0);
        break;
    }
  }

  private turnLeft(): void {
    this.consumeBattery(2);
    switch (this.facing) {
      case 'N':
        this.facing = 'W';
        break;
      case 'E':
        this.facing = 'N';
        break;
      case 'S':
        this.facing = 'E';
        break;
      case 'W':
        this.facing = 'S';
        break;
    }
  }

  private turnRight(): void {
    this.consumeBattery(2);
    switch (this.facing) {
      case 'N':
        this.facing = 'E';
        break;
      case 'E':
        this.facing = 'S';
        break;
      case 'S':
        this.facing = 'W';
        break;
      case 'W':
        this.facing = 'N';
        break;
    }
  }

  private takeSample(): void {
    this.consumeBattery(8);
    const currentCell = this.terrain.getTerrainAt(this.position.x, this.position.y);
    if (currentCell !== 'Obs') {
      this.samplesCollected.push(currentCell);
    }
  }

  private extendSolarPanels(): void {
    this.consumeBattery(1);
    this.battery = this.battery.recharge(10);
  }

  private consumeBattery(amount: number): void {
    this.battery = this.battery.consume(amount);
  }

  public run(commands: string[]): void {
    this.visitedCells.push(this.position.copy())
    for (const command of commands) {
      if (this.battery.value <= 0 || this.isOutOfBounds()) {
        break;
      }
      
      if ((command == 'F' || command == 'B') && this.isObstacleAhead()) {
        for (const strategy of backOffStrategies) {
          this.applyBackOffStrategy(strategy);
          if (!this.isObstacleAhead()) {
            break;
          }
        }
      }

      if (this.battery.value <= 0 || this.isOutOfBounds()) {
        break;
      }

      this.executeCommand(command);
      let lastVisitedPosition = this.visitedCells[this.visitedCells.length - 1];
      if (!lastVisitedPosition.equals(this.position)) {
        this.visitedCells.push(this.position.copy());
      }
    }
  }

  public getSimulationResults(): {
    visitedCells: Position[];
    samplesCollected: TerrainType[];
    currentBattery: number;
    finalPosition: {
      Location: { X: number; Y: number };
      Facing: 'North' | 'East' | 'South' | 'West';
    };
  } {
    return {
      visitedCells: this.visitedCells,
      samplesCollected: this.samplesCollected,
      currentBattery: this.battery.value,
      finalPosition: {
        "Location": {
          "X": this.position.x,
          "Y": this.position.y
        },
        "Facing": Direction.transformMapToDirection(this.facing)
      }
    };
  }

  private isOutOfBounds(): boolean {
    const { x, y } = this.position;
    return x < 0 || x >= this.terrain.getWidth() || y < 0 || y >= this.terrain.getHeight();
  }
}
