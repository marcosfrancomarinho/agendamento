import { DateHours } from '../../domain/value-object/DateHours';
import { ScheduleDateType } from '../domain/ScheduleDateTypes';

export interface SearchSchedulingRepositoryInterface {
  searchByAll(): Promise<ScheduleDateType[]>;
  searchByDate(scheduledDateAndTime: DateHours): Promise<ScheduleDateType[]>;
}
