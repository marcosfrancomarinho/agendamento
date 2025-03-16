import { Request, Response, NextFunction } from 'express';
import { CreateSchedulingServicesInterface } from '../@types/services/CreateSchedulingServicesInterface';
import { BodySchedulingType, CreateSchedulingControllersInterface, MessageSuccessType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { inject, injectable } from 'tsyringe';
import { CreateSchedulingServices } from '../services/CreateSchedulingServices';
import { IdUser } from '../domain/value-object/IdUser';

@injectable()
export class CreateSchedulingControllers implements CreateSchedulingControllersInterface {
  constructor(@inject(CreateSchedulingServices) private createSchedulingServices: CreateSchedulingServicesInterface) {}

  private messageSuccess(idUser: IdUser): MessageSuccessType {
    return {
      message: 'agendamento realizado com sucesso',
      idUser: idUser.value,
    };
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, phone, datehours } = request.body as BodySchedulingType;

      const idUser: IdUser = await this.createSchedulingServices.create(name, email, phone, datehours);

      response.status(201).json(this.messageSuccess(idUser));
    } catch (error) {
      next(error);
    }
  }
}
