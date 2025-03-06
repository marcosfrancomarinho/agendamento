import { ScheduleDateType } from '../controllers/CreateSchedulingControllersInterface';

export interface SearchSchedulingRepositoryInterface {
  searchByAll(): Promise<ScheduleDateType[]>;
  searchByDate(scheduledDateAndTime: Date): Promise<ScheduleDateType[]>;
}
