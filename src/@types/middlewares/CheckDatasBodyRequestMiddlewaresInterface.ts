import { NextFunction, Request, Response } from 'express';
export interface CheckDatasBodyRequestMiddlewaresInterface {
  checkAll(request: Request, response: Response, next: NextFunction): Promise<void>;
  checkDate(request: Request, response: Response, next: NextFunction): Promise<void>;
  checkId(request: Request, response: Response, next: NextFunction): Promise<void>;
  checkLoginUser(request: Request, response: Response, next: NextFunction): Promise<void>;
  checkRegisterUser(request: Request, response: Response, next: NextFunction): Promise<void>;
}
