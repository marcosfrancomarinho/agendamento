import { Request, Response, NextFunction } from 'express';
import {
  RegisterAdminControllersInterface,
  RegisterUserType,
} from '../@types/controllers/RegisterAdminControllersInterface';
import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminServices } from '../services/RegisterAdminServices';

@injectable()
export class RegisterAdminControllers implements RegisterAdminControllersInterface {
  constructor(@inject(RegisterAdminServices) private registerAdminServices: RegisterAdminServicesInterface) {}

  private messageSucess(id: number): { message: string; idUser: number } {
    return { message: 'usuario registrado com sucesso', idUser: id };
  }

  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, name, password } = request.body as RegisterUserType;
      const id: number = await this.registerAdminServices.register(name, email, password);
      response.status(200).json(this.messageSucess(id));
    } catch (error) {
      next(error);
    }
  }
}
