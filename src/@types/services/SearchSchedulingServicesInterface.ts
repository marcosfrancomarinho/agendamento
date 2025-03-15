import { DateHours } from "../../domain/value-object/DateHours";
import { ScheduleDateType } from "../domain/ScheduleDateTypes";

export interface SearchSchedulingServicesInterface {
  searchByDate(datahours: DateHours): Promise<ScheduleDateType[]>;
  searchByAll(): Promise<ScheduleDateType[]>;
}
