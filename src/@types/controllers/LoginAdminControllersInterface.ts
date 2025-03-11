import { NextFunction, Request, Response } from 'express';

export interface LoginAdminControllersInterface {
  login(request: Request, response: Response, next: NextFunction): Promise<void>;
}
export type LoginUserTypes = {
  email: string;
  password: string;
};