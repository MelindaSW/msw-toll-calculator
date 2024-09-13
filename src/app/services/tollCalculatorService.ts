export interface ITollCalculatorService {
  getTollFee: (vehicle: string, passByTimeStamps: string[]) => number;
}
