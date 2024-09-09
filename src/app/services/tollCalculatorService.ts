export interface ITollCalculatorService {
  getTollFee: (vehicle: string, dates: Date[]) => number;
}
