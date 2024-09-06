export interface ITollCalculatorService {
  getToll: (vehicle: string, dates: Date[]) => number;
}
