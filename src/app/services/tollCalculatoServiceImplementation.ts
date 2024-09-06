import { ITollCalculatorService } from './tollCalculatorService';

export class TollCalculatorService implements ITollCalculatorService {
  constructor() {}
  getToll(vehicle: string, dates: Date[]): number {
    return 60;
  }
}
