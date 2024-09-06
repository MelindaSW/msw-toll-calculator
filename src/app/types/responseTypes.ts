export interface ErrorResponseBody {
  requestUrl: string;
  status: number;
  message: string;
}

export interface TollCalculatorResponse {
  totalTollFee: number;
  forVehicle: string;
  forDates: Date[];
}
