export class BatteryCapacity {
    constructor(public readonly value: number) {

    }

    public consume(amount: number): BatteryCapacity {
        return new BatteryCapacity(Math.max(0, this.value - amount));
    }

    public recharge(amount: number): BatteryCapacity {
        return new BatteryCapacity(this.value + amount);
    }

    public isEqual(other: BatteryCapacity): boolean {
        return this.value === other.value;
    }
}