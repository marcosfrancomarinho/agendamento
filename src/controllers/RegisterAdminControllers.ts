import { Request, Response, NextFunction } from 'express';
import { RegisterAdminControllersInterface, RegisterUserType } from '../@types/controllers/RegisterAdminControllersInterface';
import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminServices } from '../services/RegisterAdminServices';
import { IdUser } from '../domain/value-object/IdUser';
import { MessageSuccessType } from '../@types/controllers/CreateSchedulingControllersInterface';

@injectable()
export class RegisterAdminControllers implements RegisterAdminControllersInterface {
  constructor(@inject(RegisterAdminServices) private registerAdmin: RegisterAdminServicesInterface) {}

  private messageSucess(idUser: IdUser): MessageSuccessType {
    return { message: 'usuario registrado com sucesso', idUser: idUser.value };
  }

  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = request.body as RegisterUserType;

      const idUser: IdUser = await this.registerAdmin.register(name, email, password);

      response.status(200).json(this.messageSucess(idUser));
    } catch (error) {
      next(error);
    }
  }
}
