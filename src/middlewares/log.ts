import { NextFunction, Request, Response } from "express";

const logMiddleware =(req: Request, res:Response, next:NextFunction) => {
  console.log('Request: ', req.method, req.path);
  const userAgent=req.headers['user-agent'];
  console.log('User-Agent: ', userAgent);
  next();
}

export { logMiddleware };