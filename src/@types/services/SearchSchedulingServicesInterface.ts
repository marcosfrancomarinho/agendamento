import { DateHours } from "../../entities/DateHours";
import { ScheduleDateType } from "../entities/ScheduleDateTypes";

export interface SearchSchedulingServicesInterface {
  searchByDate(datahours: DateHours): Promise<ScheduleDateType[]>;
  searchByAll(): Promise<ScheduleDateType[]>;
}
