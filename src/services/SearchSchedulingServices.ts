import { inject, injectable } from 'tsyringe';
import { ScheduleDateType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { SearchSchedulingRepositoryInterface } from '../@types/repository/SearchSchedulingRepositoryInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { SearchSchedulingRepository } from '../repository/SearchSchedulingRepository';

@injectable()
export class SearchSchedulingServices implements SearchSchedulingServicesInterface {
  constructor(
    @inject(SearchSchedulingRepository) private searchSchedulingRepository: SearchSchedulingRepositoryInterface
  ) {}
  public async searchByDate(datehours: Date): Promise<ScheduleDateType[]> {
    try {
      const appointments: ScheduleDateType[] = await this.searchSchedulingRepository.searchByDate(datehours);
      return appointments;
    } catch (error) {
      throw error as Error;
    }
  }
  public async searchByAll(): Promise<ScheduleDateType[]> {
    try {
      const appointments: ScheduleDateType[] = await this.searchSchedulingRepository.searchByAll();
      return appointments;
    } catch (error) {
      throw error as Error;
    }
  }
}
