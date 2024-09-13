import { Request, Response } from 'express';
import { TollCalculatorResponse } from '../types/responseTypes';
import { ITollCalculatorService } from '../services/tollCalculatorService';
import { logOutgoingResponse } from '../utils/logging';

export class TollCalculatorController {
  constructor(private tollCalculatorService: ITollCalculatorService) {}

  calculateTollFee(req: Request, res: Response) {
    const fee = this.tollCalculatorService.getTollFee(
      req.body.vehicle,
      req.body.dates
    );
    const response: TollCalculatorResponse = {
      totalTollFee: fee,
      forVehicle: req.body.vehicle,
      forDates: req.body.dates
    };
    logOutgoingResponse(req.url, response);
    res.status(200);
    res.send(response);
  }
}
