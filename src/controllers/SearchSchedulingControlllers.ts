import { Request, Response, NextFunction } from 'express';
import { SearchSchedulingControllersInterface } from '../@types/controllers/SearchSchedulingAdapterControllersInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { inject, injectable } from 'tsyringe';
import { SearchSchedulingServices } from '../services/SearchSchedulingServices';
import { ScheduleDateType } from '../@types/domain/ScheduleDateTypes';
import { DateHours } from '../domain/value-object/DateHours';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';

@injectable()
export class SearchSchedulingControllers implements SearchSchedulingControllersInterface {
  constructor(
    @inject(SearchSchedulingServices) private searchScheduling: SearchSchedulingServicesInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  public async searchByDate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { datehours } = request.query as unknown as { datehours: string };

      const dateHours = await DateHours.create(datehours, this.verifyDatas);

      const appointments: ScheduleDateType[] = await this.searchScheduling.searchByDate(dateHours);

      response.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
  public async searchByAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const appointments: ScheduleDateType[] = await this.searchScheduling.searchByAll();
      response.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
}
