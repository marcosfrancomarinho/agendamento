
export interface ScheduleAvailabilityServicesInterface {
  availability(datehours:string): Promise<Date[]>;
}
