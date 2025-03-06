import { ScheduleDateType } from '../controllers/CreateSchedulingControllersInterface';

export interface SearchSchedulingServicesInterface {
  searchByDate(datahours: Date): Promise<ScheduleDateType[]>;
  searchByAll(): Promise<ScheduleDateType[]>;
}
