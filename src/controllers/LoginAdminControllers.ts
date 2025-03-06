import { Request, Response, NextFunction } from 'express';
import { LoginAdminControllersInterface } from '../@types/controllers/LoginAdminControllersInterface';
import { inject, injectable } from 'tsyringe';
import { LoginUserTypes } from '../@types/utils/VerifyDatasAdapterInterface';
import { LoginAdminServicesInterface } from '../@types/services/LoginAdminServicesInterface';
import { LoginAdminServices } from '../services/LoginAdminServices';
import { AuthenticationTokenAdapter } from '../utils/AuthenticationTokenAdapter';

@injectable()
export class LoginAdminControllers implements LoginAdminControllersInterface {
  constructor(
    @inject(LoginAdminServices) private loginAdminServices: LoginAdminServicesInterface,
    @inject(AuthenticationTokenAdapter) private authenticationTokenAdapter: AuthenticationTokenAdapter
  ) {}

  private messageSucess(id: number): { message: string; idUser: number } {
    return { message: 'usuario logado com sucesso', idUser: id };
  }
  public async login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = request.body as LoginUserTypes;
      const id: number = await this.loginAdminServices.login(email, password);
      const token: string = this.authenticationTokenAdapter.genereteHash(id);
      response.status(200).setHeader('token', token).json(this.messageSucess(id));
    } catch (error) {
      next(error);
    }
  }
}
