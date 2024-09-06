import { Request, Response } from 'express';

export const logIncomingRequest = (req: Request) => {
  const time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, time);
};
