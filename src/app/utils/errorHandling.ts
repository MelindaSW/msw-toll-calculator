import { Request, Response } from 'express';
import { ErrorResponseBody } from '../types/responseTypes';

const handleErrorResponse = (err: Error, req: Request, res: Response) => {
  const status = 500;
  const errorResponse: ErrorResponseBody = {
    requestUrl: req.url,
    status,
    message: err.message
  };
  res.status(status);
  res.send(errorResponse);
};

export { handleErrorResponse };
