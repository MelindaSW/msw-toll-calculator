import {
  dateIsOnWeekend,
  dateIsTollFreeHoliday,
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
      { from: '18:00:00', to: '23:59:59' }
    ],
    [this.rushHourFee]: [
      { from: '07:00:00', to: '07:59:59' },
      { from: '15:30:00', to: '16:59:59' } // TODO: Assuming this rush hour range is not starting at 15:00, as in the previous implementation which overlaps with one of the medium fee ranges. Making it 15:30 here for now. Will need a verification if it is a correct assumption.
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

  getTollFee(vehicle: string, passByTimeStamps: string[]): number {
    const passes = passByTimeStamps
      .map((dateTime: string) => new Date(dateTime))
      .sort((a: Date, b: Date) => {
        return a.getTime() - b.getTime();
      });

    if (this.checkIfNoFee(vehicle, passes)) return this.noFee;

    let currentFee = this.calculateFeeForTime(passes[0]);
    let previousFee = currentFee;
    let sameHrLimit = this.getNewHrLimit(passes[0]);
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
        sameHrLimit = this.getNewHrLimit(currentTime);
        totalFee += currentFee;
        previousFee = currentFee;
      }

      if (totalFee >= this.maximumFee) return this.maximumFee;
    }

    return totalFee;
  }

  private getNewHrLimit = (date: Date) => {
    let newLimit = new Date(date);
    newLimit.setHours(date.getHours() + 1);
    return newLimit;
  };

  private checkIfNoFee = (vehicle: string, passes: Date[]) => {
    return (
      passes.length === 0,
      vehicleIsTollFree(vehicle) ||
        dateIsOnWeekend(passes[0]) ||
        dateIsTollFreeHoliday(passes[0])
    );
  };

  private calculateFeeForTime = (timeStamp: Date): number => {
    const date = timeStamp.toISOString().substring(0, 10) + 'T';
    let fee = 0;

    for (const [keyFee, valueRanges] of Object.entries(this.timeRanges)) {
      valueRanges.forEach((range) => {
        if (
          this.timeIsWithinRange(timeStamp, {
            from: new Date(`${date}${range.from}Z`),
            to: new Date(`${date}${range.to}Z`)
          })
        ) {
          fee = +keyFee;
        }
      });
    }

    return fee;
  };

  private timeIsWithinRange = (
    timeStamp: Date,
    range: { from: Date; to: Date }
  ) => {
    console.log({ timeStamp, range });
    return (
      timeStamp.getTime() >= range.from.getTime() &&
      timeStamp.getTime() <= range.to.getTime()
    );
  };
}
