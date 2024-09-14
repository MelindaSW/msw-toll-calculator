import { describe, expect, test } from '@jest/globals';
import {
  dateIsOnWeekend,
  dateIsFeeFreeHoliday,
  isCorrectDateTimeFormat,
  vehicleIsTolled,
  vehicleIsTollFree,
  vehicleIsValid
} from './validators';
import {
  allVehicles,
  vehicleWithFees,
  feeFreeVehicles
} from '../types/vehicleTypes';

const swedishNationalHolidays2024 = [
  '2024-01-01', // New years day
  '2024-01-06', // Epiphany
  '2024-03-29', // Long friday
  '2024-03-30', // Easter eve
  '2024-03-31', // Easter day
  '2024-04-01', // Easter monday
  '2024-05-01', // First of May
  '2024-05-09', // Ascension day
  '2024-05-19', // Pentecost
  '2024-06-06', // National day
  '2024-06-21', // Midsummer eve
  '2024-06-22', // Midsummer day
  '2024-11-02', // All saints eve
  '2024-12-24', // Christmas eve
  '2024-12-25', // Christmas day
  '2024-12-26', // Boxing day
  '2024-12-31' // New years eve
];

describe('Vehicle validator ', () => {
  test('vehicleIsValid should return true when the parameter is of type Vehicle', () => {
    allVehicles.forEach((v) => {
      expect(vehicleIsValid(v)).toBe(true);
    });
  });

  test('vehicleIsValid should return false when the parameter is not of type vehicle', () => {
    expect(vehicleIsValid('Boat')).toBe(false);
  });

  test('vehicleIsTollFree should return true when the parameter is of type TollFreeVehicle', () => {
    feeFreeVehicles.forEach((v) => {
      expect(vehicleIsTollFree(v)).toBe(true);
    });
  });

  test('vehicleIsTollFreeVehicle should return false when the parameter is not of type TollFreeVehicle', () => {
    expect(vehicleIsTollFree('Boat')).toBe(false);
  });

  test('vehicleIsTolled should return true when the parameter is of type TolledVehicle', () => {
    vehicleWithFees.forEach((v) => {
      expect(vehicleIsTolled(v)).toBe(true);
    });
  });

  test('vehicleIsTolled should return false when the parameter is not of type TolledVehicle', () => {
    expect(vehicleIsTolled('Boat')).toBe(false);
    expect(vehicleIsTolled('Motorbike')).toBe(false);
  });
});

describe('Weekend validator ', () => {
  test('dateIsWeekend should return true when day is saturday or sunday', () => {
    const saturday = new Date('2024-09-07T00:30:00.000Z');
    const sunday = new Date('2024-09-08T00:30:00.000Z');
    expect(dateIsOnWeekend(saturday)).toBe(true);
    expect(dateIsOnWeekend(sunday)).toBe(true);
  });

  test('dateIsWeekend should return false when day is a weekday', () => {
    const monday = new Date('2024-09-09T00:30:00.000Z');
    const wednesday = new Date('2024-04-08T00:30:00.000Z');
    expect(dateIsOnWeekend(monday)).toBe(false);
    expect(dateIsOnWeekend(wednesday)).toBe(false);
  });
});

describe('Holiday validator ', () => {
  test('dateIsTollFreeHoliday should return true when the parameter is on a holiday', () => {
    swedishNationalHolidays2024.forEach((date) => {
      expect(dateIsFeeFreeHoliday(new Date(date))).toBe(true);
    });
  });

  test('dateIsTollFreeHoliday should return true when the date is within the month of July', () => {
    expect(dateIsFeeFreeHoliday(new Date('2024-07-01'))).toBe(true);
    expect(dateIsFeeFreeHoliday(new Date('2024-07-29'))).toBe(true);
  });

  test('dateIsHoliday should return false when the parameter is not on a holiday and not in the month of July', () => {
    expect(dateIsFeeFreeHoliday(new Date('2024-06-23'))).toBe(false);
    expect(dateIsFeeFreeHoliday(new Date('2024-08-11'))).toBe(false);
    expect(dateIsFeeFreeHoliday(new Date('2024-10-01'))).toBe(false);
    expect(dateIsFeeFreeHoliday(new Date('2024-12-08'))).toBe(false);
  });
});

describe('Datetime format validator ', () => {
  test('isCorrectDateTimeFormat should return true when the timestamp string is valid', () => {
    expect(isCorrectDateTimeFormat('2024-09-08T06:30:30Z')).toBe(true);
  });
  test('isCorrectDateTimeFormat should return false when the timestamp string is invalid', () => {
    expect(isCorrectDateTimeFormat('2024-09-0806:30:30Z')).toBe(false);
    expect(isCorrectDateTimeFormat('2024-09-08T06:30:30.000Z')).toBe(false);
  });
});
