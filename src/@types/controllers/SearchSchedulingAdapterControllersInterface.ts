import { Response, Request, NextFunction } from 'express';

export interface SearchSchedulingControllersInterface {
  searchByDate(request: Request, response: Response, next: NextFunction): Promise<void>;
  searchByAll(request: Request, response: Response, next: NextFunction): Promise<void>;
}
