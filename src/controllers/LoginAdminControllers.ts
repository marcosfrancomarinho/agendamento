import { Request, Response, NextFunction } from 'express';
import { LoginAdminControllersInterface, LoginUserTypes } from '../@types/controllers/LoginAdminControllersInterface';
import { inject, injectable } from 'tsyringe';
import { LoginAdminServicesInterface } from '../@types/services/LoginAdminServicesInterface';
import { LoginAdminServices } from '../services/LoginAdminServices';
import { AuthenticationTokenAdapter } from '../utils/AuthenticationTokenAdapter';
import { MessageSuccessType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { IdUser } from '../domain/value-object/IdUser';
import { Token } from '../domain/value-object/Token';

@injectable()
export class LoginAdminControllers implements LoginAdminControllersInterface {
  constructor(
    @inject(LoginAdminServices) private loginAdmin: LoginAdminServicesInterface,
    @inject(AuthenticationTokenAdapter) private authenticationToken: AuthenticationTokenAdapter
  ) {}

  private messageSucess(idUser: IdUser): MessageSuccessType {
    return { message: 'usuario logado com sucesso', idUser: idUser.value };
  }
  public async login(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = request.body as LoginUserTypes;

      const idUser: IdUser = await this.loginAdmin.login(email, password);
      const token: Token = this.authenticationToken.genereteHash(idUser);

      response.status(200).setHeader('token', token.value).json(this.messageSucess(idUser));
    } catch (error) {
      next(error);
    }
  }
}
