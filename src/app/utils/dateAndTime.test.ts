import { describe, expect, test } from '@jest/globals';
import { timeIsWithinRange, incrementHours } from './dateAndTime';

describe('Datetime utils ', () => {
  test('timeIsWithinRange should true or false if time is within or out of range', () => {
    expect(
      timeIsWithinRange(new Date('2024-09-09T18:05:30Z'), {
        from: new Date('2024-09-09T18:00:30Z'),
        to: new Date('2024-09-09T19:00:30Z')
      })
    ).toBe(true);
    expect(
      timeIsWithinRange(new Date('2024-09-09T19:05:30Z'), {
        from: new Date('2024-09-09T18:00:30Z'),
        to: new Date('2024-09-09T19:00:30Z')
      })
    ).toBe(false);
  });

  test('incrementHours should return a datetime with the hour amount added', () => {
    expect(incrementHours(new Date('2024-09-09T19:05:30Z'), 2)).toStrictEqual(
      new Date('2024-09-09T21:05:30Z')
    );
    expect(incrementHours(new Date('2024-09-09T17:05:30Z'), 5)).toStrictEqual(
      new Date('2024-09-09T22:05:30Z')
    );
  });
});
