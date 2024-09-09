import {
  dateIsOnWeekend,
  dateIsTollFreeHoliday,
  vehicleIsTollFree
} from '../helpers/validators';
import { ITollCalculatorService } from './tollCalculatorService';

export class TollCalculatorService implements ITollCalculatorService {
  private readonly maxTollFee = 60;
  constructor() {}
  getTollFee(vehicle: string, dates: Date[]): number {
    let totalFee = 0;
    let currentHour = 0; // points to the hour currently calculated. If the next timestamp is within the hour, add the highest fee to the totalFee
    if (
      vehicleIsTollFree(vehicle) ||
      dateIsOnWeekend(dates[0]) ||
      dateIsTollFreeHoliday(dates[0])
    )
      return 0;

    // else:
    // sort the array of timestamps to make sure they are in ascending order
    dates.sort((a, b) => {
      return a < b ? -1 : 1;
    });
    console.log({ dates });
    // check if they are all within one day(?) throw error if not

    // iterate through dates
    dates.forEach((date) => {
      currentHour = date.getHours();
      totalFee += this.calculateFeeForTimestamp(date);

      if (totalFee >= this.maxTollFee) return this.maxTollFee;
    });
    // calculateFeeForTimestamp(datetime)
    // if fee is > maxTollFee return maxTollFee
    //   - A vehicle should only be charged once an hour
    //  - In the case of multiple fees in the same hour period, the highest one applies.

    return totalFee;
  }

  protected calculateFeeForTimestamp = (timestamp: Date): number => {
    // Rush hour:
    // 18 kr  07:00 - 07:59
    //        15:00 - 16:59

    // 13 kr  06:30 - 06:59
    //        08:00 - 08:29
    //        15:00 - 15:29
    //        17:00 - 18:00

    // 8 kr   06:00 - 06:29
    //        08:30 - 14:59
    //        18:00 - 18:29

    // 0      18:30 - 05:59
    return 0;
  };
}
