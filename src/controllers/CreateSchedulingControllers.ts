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
import { Scheduling } from '../domain/entities/Scheduling';
import { DateHours } from '../domain/value-object/DateHours';
import { Name } from '../domain/value-object/Name';
import { Email } from '../domain/value-object/Email';
import { Phone } from '../domain/value-object/Phone';

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
      const { name, email, phone, datehours } = request.body as {
        name: string;
        email: string;
        phone: string;
        datehours: string;
      };

      const _name: Name = await Name.create(name, this.verifyDatas);
      const _email: Email = await Email.create(email, this.verifyDatas);
      const _phone: Phone = await Phone.create(phone, this.verifyDatas);
      const _datehours: DateHours = await DateHours.create(datehours, this.verifyDatas);

      const scheduling: Scheduling = new Scheduling(_name, _email, _phone, _datehours);
      const { id }: QueryResultType = await this.createSchedulingServices.create(scheduling);

      response.status(201).json(this.messageSuccess(id));
    } catch (error) {
      next(error);
    }
  }
}
