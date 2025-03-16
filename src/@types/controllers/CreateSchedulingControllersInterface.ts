import { Response, Request, NextFunction } from 'express';

export interface CreateSchedulingControllersInterface {
  create(request: Request, response: Response, next: NextFunction): Promise<void>;
}

export type MessageSuccessType = {
  message: string;
  idUser: number;
};
export type BodySchedulingType = {
  name: string;
  email: string;
  phone: string;
  datehours: string;
};
