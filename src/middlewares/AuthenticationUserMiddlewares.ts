import { Request, Response, NextFunction } from 'express';
import { AuthenticationUserMiddlewaresInterface } from '../@types/middlewares/AuthenticationUserMiddlewaresInterface';
import { inject, injectable } from 'tsyringe';
import {
  AuthenticationTokenAdapterInterface,
  HashCheckResponseType,
} from '../@types/utils/AuthenticationTokenAdapterInterface';
import { AuthenticationTokenAdapter } from '../utils/AuthenticationTokenAdapter';

@injectable()
export class AuthenticationUserMiddlewares implements AuthenticationUserMiddlewaresInterface {
  private messageError: string = 'token não foi informado.';

  constructor(
    @inject(AuthenticationTokenAdapter) private authenticationTokenAdapter: AuthenticationTokenAdapterInterface
  ) {}

  public async authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = request.headers as { token: string };
      if (!token || token.length === 0) throw new Error(this.messageError);
      const hashCheckResponse: HashCheckResponseType = this.authenticationTokenAdapter.verifyHash(token);
      response.locals.idUser = hashCheckResponse.idUser;
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }
}
