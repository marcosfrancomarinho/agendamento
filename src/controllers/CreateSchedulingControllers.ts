import { Request, Response, NextFunction } from 'express';
import { CreateSchedulingServicesInterface } from '../@types/services/CreateSchedulingServicesInterface';
import {
  CreateSchedulingControllersInterface,
  MessageSuccessType,
} from '../@types/controllers/CreateSchedulingControllersInterface';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { inject, injectable } from 'tsyringe';
import { CreateSchedulingServices } from '../services/CreateSchedulingServices';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { Scheduling } from '../entities/Scheduling';
import { DateHours } from '../entities/DateHours';

@injectable()
export class CreateSchedulingControllers implements CreateSchedulingControllersInterface {
  constructor(
    @inject(CreateSchedulingServices) private createSchedulingServices: CreateSchedulingServicesInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  private messageSuccess(id: number): MessageSuccessType {
    return {
      message: 'agendamento realizado com sucesso',
      idUser: id,
    };
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, phone, datehours } = request.body;

      const dateHours: DateHours = await DateHours.create(datehours, this.verifyDatas);
      const scheduling: Scheduling = await Scheduling.create(name, email, phone, dateHours, this.verifyDatas);

      const { id }: QueryResultType = await this.createSchedulingServices.create(scheduling);

      response.status(201).json(this.messageSuccess(id));
    } catch (error) {
      next(error);
    }
  }
}
