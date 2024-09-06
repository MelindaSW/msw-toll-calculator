import { Request, Response } from 'express';
import { ErrorResponseBody } from '../types/responseTypes';

export const errorResponseHandler = (
  err: Error,
  req: Request,
  res: Response
) => {
  const status = 500; //TODO: make sure to adapt according to error
  const errorResponse: ErrorResponseBody = {
    requestUrl: req.url,
    status,
    message: err.message
  };
  res.status(status);
  res.send(errorResponse);
};
