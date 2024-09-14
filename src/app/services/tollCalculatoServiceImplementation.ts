import { incrementHours, timeIsWithinRange } from '../utils/dateAndTime';
import {
  dateIsOnWeekend,
  dateIsFeeFreeHoliday,
  vehicleIsTollFree
} from '../utils/validators';
import { ITollCalculatorService } from './tollCalculatorService';

export class TollCalculatorService implements ITollCalculatorService {
  private readonly maximumFee = 60;
  private readonly rushHourFee = 18;
  private readonly mediumFee = 13;
  private readonly lowestFee = 8;
  private readonly noFee = 0;
  private readonly timeRanges = {
    [this.noFee]: [
      { from: '00:00:00', to: '05:59:59' },
      { from: '18:30:00', to: '23:59:59' }
    ],
    [this.rushHourFee]: [
      { from: '07:00:00', to: '07:59:59' },
      { from: '15:30:00', to: '16:59:59' }
    ],
    [this.mediumFee]: [
      { from: '06:30:00', to: '06:59:59' },
      { from: '08:00:00', to: '08:29:59' },
      { from: '15:00:00', to: '15:29:59' },
      { from: '17:00:00', to: '17:59:59' }
    ],
    [this.lowestFee]: [
      { from: '06:00:00', to: '06:29:59' },
      { from: '08:30:00', to: '14:59:59' },
      { from: '18:00:00', to: '18:29:59' }
    ]
  };

  constructor() {}

  getTollFee(vehicle: string, passingDateTimes: string[]): number {
    const passes = passingDateTimes
      .map((d: string) => new Date(d))
      .sort((a: Date, b: Date) => {
        return a.getTime() - b.getTime();
      });

    if (this.checkIfNoFee(vehicle, passes)) return this.noFee;

    let currentFee = this.calculateFeeForTime(passes[0]);
    let previousFee = currentFee;
    let sameHrLimit = incrementHours(passes[0], 1);
    let totalFee = currentFee;

    for (let i = 1; i < passes.length; i++) {
      // A vehicle should only be charged once an hour
      // In the case of multiple fees in the same hour period, the highest one applies.
      const currentTime = passes[i];
      const isWithinSameHour = currentTime <= sameHrLimit;
      currentFee = this.calculateFeeForTime(currentTime);

      if (isWithinSameHour) {
        totalFee += currentFee > previousFee ? currentFee : 0;
      } else {
        sameHrLimit = incrementHours(currentTime, 1);
        totalFee += currentFee;
        previousFee = currentFee;
      }

      if (totalFee >= this.maximumFee) return this.maximumFee;
    }

    return totalFee;
  }

  private checkIfNoFee = (vehicle: string, passes: Date[]) => {
    return (
      passes.length === 0,
      vehicleIsTollFree(vehicle) ||
        dateIsOnWeekend(passes[0]) ||
        dateIsFeeFreeHoliday(passes[0])
    );
  };

  private calculateFeeForTime = (timeStamp: Date): number => {
    const date = timeStamp.toISOString().substring(0, 10);
    let fee = 0;

    for (const [keyFee, valueRanges] of Object.entries(this.timeRanges)) {
      valueRanges.forEach((range) => {
        if (
          timeIsWithinRange(timeStamp, {
            from: new Date(`${date}T${range.from}Z`),
            to: new Date(`${date}T${range.to}Z`)
          })
        ) {
          fee = +keyFee;
        }
      });
    }

    return fee;
  };
}
