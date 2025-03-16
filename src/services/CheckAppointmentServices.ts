import { ScheduleDateType } from '../@types/domain/ScheduleDateTypes';
import { CheckAppointmentServicesInterface } from '../@types/services/CheckAppointmentServicesInterface';
import { Scheduling } from '../domain/entities/Scheduling';
import { SearchSchedulingRepository } from '../repository/SearchSchedulingRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CheckAppointmentServices implements CheckAppointmentServicesInterface {
  private readonly SERVICE_TIME: number = 60;

  constructor(@inject(SearchSchedulingRepository) private searchSchedulingRepository: SearchSchedulingRepository) {}

  private addServiceTime(date: Date, multiplier: number): Date {
    const newDate: Date = new Date(date.getTime());
    newDate.setMinutes(newDate.getMinutes() + this.SERVICE_TIME * multiplier);
    return newDate;
  }

  private checkAppointmentAvailability(requestedDateAndTime: Date, scheduledDateAndTime: Date): void {
    const busyStart: Date = this.addServiceTime(scheduledDateAndTime, -1);
    const busyEnd: Date = this.addServiceTime(scheduledDateAndTime, 1);

    if (requestedDateAndTime.getTime() >= busyStart.getTime() && requestedDateAndTime.getTime() <= busyEnd.getTime()) {
      throw new Error(`O horário "${requestedDateAndTime}" já está reservado.`);
    }
  }

  public async check(scheduling: Scheduling): Promise<void> {
    const responseQuerySearchDatabase: ScheduleDateType[] = await this.searchSchedulingRepository.searchByAll();
    if (responseQuerySearchDatabase.length === 0) return;

    for (const { datehours } of responseQuerySearchDatabase) {
      this.checkAppointmentAvailability(scheduling.properties.datehours, datehours);
    }
  }
}
