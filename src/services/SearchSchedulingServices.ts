import { inject, injectable } from 'tsyringe';
import { SearchSchedulingRepositoryInterface } from '../@types/repository/SearchSchedulingRepositoryInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { SearchSchedulingRepository } from '../repository/SearchSchedulingRepository';
import { ScheduleDateType } from '../@types/entities/ScheduleDateTypes';
import { DateHours } from '../entities/DateHours';

@injectable()
export class SearchSchedulingServices implements SearchSchedulingServicesInterface {
  constructor(
    @inject(SearchSchedulingRepository) private searchSchedulingRepository: SearchSchedulingRepositoryInterface
  ) {}
  public async searchByDate(dateHours: DateHours): Promise<ScheduleDateType[]> {
    try {
      const appointments: ScheduleDateType[] = await this.searchSchedulingRepository.searchByDate(dateHours);
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
