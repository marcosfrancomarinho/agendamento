import { inject, injectable } from 'tsyringe';
import {
  CreateSchedulingRepositoryInterface,
  QueryResultType,
} from '../@types/repository/CreateSchedulingRepositoryInterface';
import { CheckAppointmentServicesInterface } from '../@types/services/CheckAppointmentServicesInterface';
import { CreateSchedulingServicesInterface } from '../@types/services/CreateSchedulingServicesInterface';
import { CreateSchedulingRepository } from '../repository/CreateSchedulingRepository';
import { CheckAppointmentServices } from './CheckAppointmentServices';
import { Scheduling } from '../entities/Scheduling';

@injectable()
export class CreateSchedulingServices implements CreateSchedulingServicesInterface {
  constructor(
    @inject(CreateSchedulingRepository) private createSchedulingRepository: CreateSchedulingRepositoryInterface,
    @inject(CheckAppointmentServices) private checkAppointmentServices: CheckAppointmentServicesInterface
  ) {}

  public async create(scheduling: Scheduling): Promise<QueryResultType> {
    try {
      await this.checkAppointmentServices.check(scheduling);
      const responseQueryInsertDatabase: QueryResultType = await this.createSchedulingRepository.create(scheduling);
      return responseQueryInsertDatabase;
    } catch (error) {
      throw error as Error;
    }
  }
}
