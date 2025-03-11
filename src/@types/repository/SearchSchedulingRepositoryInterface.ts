import { DateHours } from '../../entities/DateHours';
import { ScheduleDateType } from '../entities/ScheduleDateTypes';

export interface SearchSchedulingRepositoryInterface {
  searchByAll(): Promise<ScheduleDateType[]>;
  searchByDate(scheduledDateAndTime: DateHours): Promise<ScheduleDateType[]>;
}
