import { inject, injectable } from 'tsyringe';
import { ScheduleAvailabilityServicesInterface } from '../@types/services/ScheduleAvailabilityServicesInterface';
import { SearchSchedulingServicesInterface } from '../@types/services/SearchSchedulingServicesInterface';
import { DateHours } from '../domain/value-object/DateHours';
import { SearchSchedulingServices } from './SearchSchedulingServices';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { ScheduleDateType } from '../@types/domain/ScheduleDateTypes';

@injectable()
export class ScheduleAvailabilityServices implements ScheduleAvailabilityServicesInterface {
  private HOURS_START: number = 8;
  private HOURS_END: number = 18;
  private MINUTES_IN_ONE_HOUR: number = 60;
  private SERVICE_TIME: number = 60;
  private BUSINESS_HOURS_START: number = this.HOURS_START * this.MINUTES_IN_ONE_HOUR;
  private BUSINESS_HOURS_END: number = this.HOURS_END * this.MINUTES_IN_ONE_HOUR;
  private APPOINTMENT_NUMBER: number = Math.floor((this.BUSINESS_HOURS_END - this.BUSINESS_HOURS_START) / this.SERVICE_TIME);

  constructor(
    @inject(SearchSchedulingServices) private searchScheduling: SearchSchedulingServicesInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  public async availability(datehours: string): Promise<Date[]> {
    const dateHours: DateHours = await DateHours.create(datehours, this.verifyDatas);
    const date: Date = new Date(dateHours.value.getTime());
    const availableAppointments: Date[] = [];
    const responseQuerySearchDatabase: ScheduleDateType[] = await this.searchScheduling.searchByDate(dateHours);

    date.setHours(this.HOURS_START, 0, 0, 0);

    for (let index: number = 0; index < this.APPOINTMENT_NUMBER; index++) {
      availableAppointments.push(new Date(date));
      date.setMinutes(date.getMinutes() + this.SERVICE_TIME);
    }

    if (responseQuerySearchDatabase.length === 0) return availableAppointments;

    const occupiedTimes: number[] = responseQuerySearchDatabase.map(({ datehours }) => {
      return datehours.getTime();
    });

    const filteredAppointments: Date[] = availableAppointments.filter((scheduler) => {
      return !occupiedTimes.includes(scheduler.getTime());
    });

    return filteredAppointments;
  }
}
