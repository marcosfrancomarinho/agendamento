import { Request, Response, NextFunction } from 'express';
import {
  RegisterAdminControllersInterface,
  RegisterUserType,
} from '../@types/controllers/RegisterAdminControllersInterface';
import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminServices } from '../services/RegisterAdminServices';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { UserRegister } from '../domain/entities/UserRegister';
import { Name } from '../domain/value-object/Name';
import { Password } from '../domain/value-object/Password';
import { Email } from '../domain/value-object/Email';

@injectable()
export class RegisterAdminControllers implements RegisterAdminControllersInterface {
  constructor(
    @inject(RegisterAdminServices) private registerAdminServices: RegisterAdminServicesInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  private messageSucess(id: number): { message: string; idUser: number } {
    return { message: 'usuario registrado com sucesso', idUser: id };
  }

  public async register(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, name, password } = request.body as RegisterUserType;

      const _name: Name = await Name.create(name, this.verifyDatas);
      const _email: Email = await Email.create(email, this.verifyDatas);
      const _password: Password = await Password.create(password, this.verifyDatas);

      const userRegister: UserRegister = new UserRegister(_name, _email, _password);

      const id: number = await this.registerAdminServices.register(userRegister);

      response.status(200).json(this.messageSucess(id));
    } catch (error) {
      next(error);
    }
  }
}
