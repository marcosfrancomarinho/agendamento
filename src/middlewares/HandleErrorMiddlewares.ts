import { NextFunction, Request, Response } from 'express';

export class HandleErrorMiddlewares {
  public static catch(error: any, request: Request, response: Response, next: NextFunction): void {
    response.status(400).json({ error: error.message });
  }
}
