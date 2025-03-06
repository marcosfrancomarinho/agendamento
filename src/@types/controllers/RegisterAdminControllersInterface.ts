import { NextFunction, Request, Response } from 'express';
import { LoginUserTypes } from '../utils/VerifyDatasAdapterInterface';

export interface RegisterAdminControllersInterface {
  register(request: Request, response: Response, next: NextFunction): Promise<void>;
}

export interface RegisterUserType extends LoginUserTypes {
  name: string;
}
