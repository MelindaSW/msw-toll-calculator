import { describe, expect, test } from '@jest/globals';
import { TollCalculatorService } from './tollCalculatoServiceImplementation';
import { feeFreeVehicles } from '../types/vehicleTypes';

const tollCalculator = new TollCalculatorService();
const maximumFee = 60;
const rushHourFee = 18;
const mediumFee = 13;
const lowestFee = 8;
const noFee = 0;

describe('TollCalculator should return 0 for ', () => {
  test('toll free vehicles', () => {
    feeFreeVehicles.forEach((vehicle) => {
      expect(tollCalculator.getTollFee(vehicle, ['2024-09-09T06:30:30Z'])).toBe(
        noFee
      );
    });
  });

  test('Saturday or Sunday', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-09-08T06:30:30Z'])).toBe(
      noFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-07T06:30:30Z'])).toBe(
      noFee
    );
  });

  test('public holidays', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-12-24T06:30:30Z'])).toBe(
      noFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-12-31T06:30:30Z'])).toBe(
      noFee
    );
  });
});

describe('TollCalculator should return the correct fee for single time stamps at ', () => {
  test('rush hour', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T07:59:00Z'])).toBe(
      rushHourFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T07:00:30Z'])).toBe(
      rushHourFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T15:45:30Z'])).toBe(
      rushHourFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T15:30:00Z'])).toBe(
      rushHourFee
    );
  });

  test('around rush hour', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T06:30:30Z'])).toBe(
      mediumFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T08:20:30Z'])).toBe(
      mediumFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T15:00:30Z'])).toBe(
      mediumFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T17:59:30Z'])).toBe(
      mediumFee
    );
  });

  test('non rush hour', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T06:00:30Z'])).toBe(
      lowestFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T08:45:30Z'])).toBe(
      lowestFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T18:00:30Z'])).toBe(
      lowestFee
    );
  });

  test('hours with no fee', () => {
    expect(tollCalculator.getTollFee('Car', ['2024-09-09T18:30:30Z'])).toBe(
      noFee
    );
    expect(tollCalculator.getTollFee('Car', ['2024-09-10T00:00:00Z'])).toBe(
      noFee
    );
  });
});

describe('Tollcalculator should return the correct fee for an array of timestamps when having several passes ', () => {
  test('within an hour', () => {
    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T17:45:30Z',
        '2024-09-09T18:14:00Z',
        '2024-09-09T18:35:00Z'
      ])
    ).toBe(mediumFee);

    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T07:58:00Z',
        '2024-09-09T08:15:25Z',
        '2024-09-09T08:58:00Z'
      ])
    ).toBe(rushHourFee);

    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T07:00:00Z',
        '2024-09-09T07:15:25Z',
        '2024-09-09T17:59:00Z',
        '2024-09-09T18:01:00Z',
        '2024-09-09T18:37:00Z'
      ])
    ).toBe(31);
  });

  test('spread over one day', () => {
    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T07:58:00Z',
        '2024-09-09T15:15:25Z',
        '2024-09-09T18:15:00Z'
      ])
    ).toBe(39);

    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T05:00:00Z',
        '2024-09-09T06:30:00Z',
        '2024-09-09T16:20:25Z',
        '2024-09-09T18:45:00Z'
      ])
    ).toBe(31);
  });

  test('where sum is larger than maximum fee, then return the max fee', () => {
    expect(
      tollCalculator.getTollFee('Car', [
        '2024-09-09T07:05:00Z',
        '2024-09-09T15:15:25Z',
        '2024-09-09T08:15:00Z',
        '2024-09-09T06:35:00Z',
        '2024-09-09T15:15:00Z',
        '2024-09-09T17:15:00Z',
        '2024-09-09T06:01:00Z'
      ])
    ).toBe(maximumFee);
  });
});
