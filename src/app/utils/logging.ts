import { Request, Response } from 'express';
import { TollCalculatorResponse } from '../types/responseTypes';

const logIncomingRequest = (req: Request) => {
  const time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, time);
};

const logOutgoingResponse = (
  url: string,
  responseBody: TollCalculatorResponse
) => {
  const time = new Date(Date.now()).toString();
  console.log('Toll calculated: ', time, url, responseBody);
};

export { logIncomingRequest, logOutgoingResponse };
