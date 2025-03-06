import { NextFunction, Response, Request } from 'express';

export interface AuthenticationUserMiddlewaresInterface {
  authenticate(request: Request, response: Response, next: NextFunction): Promise<void>;
}
