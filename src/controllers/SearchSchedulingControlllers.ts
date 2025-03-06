import { Request, Response, NextFunction } from 'express';
import { SearchSchedulingControllersInterface } from '../@types/controllers/SearchSchedulingAdapterControllersInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { ScheduleDateType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { inject, injectable } from 'tsyringe';
import { SearchSchedulingServices } from '../services/SearchSchedulingServices';

@injectable()
export class SearchSchedulingControllers implements SearchSchedulingControllersInterface {
  constructor(@inject(SearchSchedulingServices) private searchSchedulingServices: SearchSchedulingServicesInterface) {}

  public async searchByDate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { datehours } = request.query as unknown as { datehours: Date };
      const appointments: ScheduleDateType[] = await this.searchSchedulingServices.searchByDate(datehours);
      response.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
  public async searchByAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const appointments: ScheduleDateType[] = await this.searchSchedulingServices.searchByAll();
      response.status(200).json(appointments);
    } catch (error) {
      next(error);
    }
  }
}
