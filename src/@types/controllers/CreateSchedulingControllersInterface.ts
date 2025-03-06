import { Response, Request, NextFunction } from 'express';

export interface CreateSchedulingControllersInterface {
  create(request: Request, response: Response, next: NextFunction): Promise<void>;
}
export type ScheduleDateType = {
  name: string;
  email: string;
  phone: string;
  datehours: Date;
};
export type MessageSuccessType = {
  message: string;
  idUser: number;
};
