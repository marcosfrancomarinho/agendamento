import { Request, Response, NextFunction } from 'express';
import { CreateSchedulingServicesInterface } from '../@types/services/CreateSchedulingServicesInterface';
import {
  CreateSchedulingControllersInterface,
  MessageSuccessType,
  ScheduleDateType,
} from '../@types/controllers/CreateSchedulingControllersInterface';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { inject, injectable } from 'tsyringe';
import { CreateSchedulingServices } from '../services/CreateSchedulingServices';

@injectable()
export class CreateSchedulingControllers implements CreateSchedulingControllersInterface {
  constructor(@inject(CreateSchedulingServices) private createSchedulingServices: CreateSchedulingServicesInterface) {}

  private messageSuccess(id: number): MessageSuccessType {
    return {
      message: 'agendamento realizado com sucesso',
      idUser: id,
    };
  }

  private getSchedulingDaRequest(request: Request): ScheduleDateType {
    const { datehours, ...rest } = request.body;
    const _date_hour_converted_format_date: Date = new Date(datehours);
    return {
      datehours: _date_hour_converted_format_date,
      ...rest,
    } as ScheduleDateType;
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, phone, datehours } = this.getSchedulingDaRequest(request);
      const { id }: QueryResultType = await this.createSchedulingServices.create(name, email, phone, datehours);
      response.status(201).json(this.messageSuccess(id));
    } catch (error) {
      next(error);
    }
  }
}
