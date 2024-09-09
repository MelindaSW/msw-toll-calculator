import { describe, expect, test } from '@jest/globals';
import { TollCalculatorService } from './tollCalculatoServiceImplementation';
import { tollFreeVehicle } from '../types/vehicleTypes';

const tollCalculator = new TollCalculatorService();
const rushHourFee = 18;
const surroundingRushHourFee = 13;
const lowestFee = 8;

describe('TollCalculator should return 0 for ', () => {
  test('toll free vehicles', () => {
    tollFreeVehicle.forEach((vehicle) => {
      expect(
        tollCalculator.getTollFee(vehicle, [
          new Date('2024-09-09T06:30:30:000Z')
        ])
      ).toBe(0);
    });
  });

  test('Saturday or Sunday', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-08T06:30:30:000Z')])
    ).toBe(0);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-07T06:30:30:000Z')])
    ).toBe(0);
  });

  test('public holidays', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-12-24T06:30:30:000Z')])
    ).toBe(0);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-12-31T06:30:30:000Z')])
    ).toBe(0);
  });
});

describe('TollCalculator should return the correct fee for single time stamps at ', () => {
  test('rush hour', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T07:59:00:000Z')])
    ).toBe(rushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T07:00:30:000Z')])
    ).toBe(rushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T15:45:30:000Z')])
    ).toBe(rushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T15:00:00:000Z')])
    ).toBe(rushHourFee);
  });

  test('surrounding rush hour', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T06:30:30:000Z')])
    ).toBe(surroundingRushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T08:20:30:000Z')])
    ).toBe(surroundingRushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T15:00:30:000Z')])
    ).toBe(surroundingRushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T17:59:30:000Z')])
    ).toBe(surroundingRushHourFee);
  });

  test('non rush hour', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T06:00:30:000Z')])
    ).toBe(lowestFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T08:45:30:000Z')])
    ).toBe(lowestFee);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T18:00:30:000Z')])
    ).toBe(lowestFee);
  });

  test('hours with no fee', () => {
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-09T18:30:30:000Z')])
    ).toBe(0);
    expect(
      tollCalculator.getTollFee('Car', [new Date('2024-09-10T05:59:00:000Z')])
    ).toBe(0);
  });
});

describe('Tollcalculator should return the correct fee for an array of timestamps ', () => {
  test('when having several passes within an hour', () => {
    expect(
      tollCalculator.getTollFee('Car', [
        new Date('2024-09-09T17:45:30:000Z'),
        new Date('2024-09-09T18:14:00:000Z'),
        new Date('2024-09-09T18:35:00:000Z')
      ])
    ).toBe(surroundingRushHourFee);
    expect(
      tollCalculator.getTollFee('Car', [
        new Date('2024-09-09T07:58:00:000Z'),
        new Date('2024-09-09T08:15:25:000Z'),
        new Date('2024-09-09T08:58:00:000Z')
      ])
    ).toBe(rushHourFee);
  });

  test('when having several passes spread over one day', () => {
    expect(
      tollCalculator.getTollFee('Car', [
        new Date('2024-09-09T07:58:00:000Z'), // 18
        new Date('2024-09-09T15:15:25:000Z'), // 13
        new Date('2024-09-09T18:15:00:000Z') // 8
      ])
    ).toBe(39);

    expect(
      tollCalculator.getTollFee('Car', [
        new Date('2024-09-09T05:00:00:000Z'), // 0
        new Date('2024-09-09T16:20:25:000Z'), // 13
        new Date('2024-09-09T18:45:00:000Z') // 0
      ])
    ).toBe(13);
  });
});

// Timestamps for test
// YYYY-MM-DDTHH:mm:ss.ssZ
// Inidividual timestamps should return correct amount with only one timestamp in the dates array:
// Rush hour:
// 18 kr  07:00 - 07:59  2024-09-09T07:59:00:000Z 2024-09-09T07:00:30:000Z
//        15:00 - 16:59  2024-09-09T15:45:30:000Z 2024-09-09T15:00:00:000Z

// 13 kr  06:30 - 06:59  2024-09-09T06:30:30:000Z
//        08:00 - 08:29  2024-09-09T08:20:30:000Z
//        15:00 - 15:29  2024-09-09T15:00:30:000Z
//        17:00 - 17:59  2024-09-09T17:59:30:000Z

// 8 kr   06:00 - 06:29  2024-09-09T06:00:30:000Z
//        08:30 - 14:59  2024-09-09T08:45:30:000Z
//        18:00 - 18:29  2024-09-09T18:00:30:000Z

// 0  kr  18:30 - 05:59 2024-09-09T18:30:30:000Z 2024-09-10T05:59:00:000Z

// Timestamps for tests with several passes in one hour - return the highest fee.

// 2024-09-09T17:45:30:000Z 2024-09-09T18:14:00:000Z 2024-09-09T18:35:00:000Z = 13kr

// 2024-09-09T07:58:00:000Z (18) 2024-09-09T08:15:25:000Z (13) 2024-09-09T08:58:00:000Z (8) = 18kr
