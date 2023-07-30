import { BatteryCapacity } from '../../src//domain/battery-capacity';

describe('BatteryCapacity', () => {
  test('should create a BatteryCapacity instance with the correct value', () => {
    const capacity = new BatteryCapacity(50);
    expect(capacity.value).toBe(50);
  });

  test('should correctly consume battery', () => {
    const initialCapacity = new BatteryCapacity(50);
    const consumedCapacity = initialCapacity.consume(10);
    expect(consumedCapacity.value).toBe(40);
  });

  test('should not allow negative battery capacity', () => {
    const initialCapacity = new BatteryCapacity(5);
    const consumedCapacity = initialCapacity.consume(10);
    expect(consumedCapacity.value).toBe(0);
  });

  test('should correctly recharge battery', () => {
    const initialCapacity = new BatteryCapacity(50);
    const rechargedCapacity = initialCapacity.recharge(20);
    expect(rechargedCapacity.value).toBe(70);
  });

  test('isEqual method should correctly compare two BatteryCapacity instances', () => {
    const capacity1 = new BatteryCapacity(50);
    const capacity2 = new BatteryCapacity(50);
    const capacity3 = new BatteryCapacity(40);

    expect(capacity1.isEqual(capacity2)).toBe(true);
    expect(capacity1.isEqual(capacity3)).toBe(false);
  });
});