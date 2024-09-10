import { Request, Response } from 'express';
import { ErrorResponseBody } from '../types/responseTypes';

export const errorResponseHandler = (err: Error, req: Request, res: Response) => {
  const errorResponse: ErrorResponseBody = {
    requestUrl: req.url,
    status: 400,
    message: err.message,
  };
  res.status(400);
  res.send(errorResponse);
};
