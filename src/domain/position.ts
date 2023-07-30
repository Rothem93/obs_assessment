export class Position {
    constructor(private _x: number, private _y: number) {}

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    copy(): Position {
        return new Position(this._x, this._y);
    }

    move(deltaX: number, deltaY: number): Position {
        return new Position(this._x + deltaX, this._y + deltaY);
    }

    toString(): string {
        return `(${this._x},${this._y})`;
    }

    equals(other: Position): boolean {
      return this.x === other.x && this.y === other.y;
    }
    
}