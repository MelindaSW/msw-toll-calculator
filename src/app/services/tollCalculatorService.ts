export interface ITollCalculatorService {
  getTollFee: (vehicle: string, passingDateTimes: string[]) => number;
}
