import { inject, injectable } from 'tsyringe';
import { SearchSchedulingRepositoryInterface } from '../@types/repository/SearchSchedulingRepositoryInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { SearchSchedulingRepository } from '../repository/SearchSchedulingRepository';
import { ScheduleDateType } from '../@types/domain/ScheduleDateTypes';
import { DateHours } from '../domain/value-object/DateHours';

@injectable()
export class SearchSchedulingServices implements SearchSchedulingServicesInterface {
  constructor(@inject(SearchSchedulingRepository) private searchSchedulingRepository: SearchSchedulingRepositoryInterface) {}
  public async searchByDate(dateHours: DateHours): Promise<ScheduleDateType[]> {
    const appointments: ScheduleDateType[] = await this.searchSchedulingRepository.searchByDate(dateHours);
    return appointments;
  }
  public async searchByAll(): Promise<ScheduleDateType[]> {
    const appointments: ScheduleDateType[] = await this.searchSchedulingRepository.searchByAll();
    return appointments;
  }
}
