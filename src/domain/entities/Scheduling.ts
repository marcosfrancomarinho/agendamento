import { ScheduleDateType } from '../../@types/domain/ScheduleDateTypes';
import { DateHours } from '../value-object/DateHours';
import { Email } from '../value-object/Email';
import { Name } from '../value-object/Name';
import { Phone } from '../value-object/Phone';

export class Scheduling {
  private MINUTES_IN_ONE_HOUR: number = 60;
  private BUSINESS_HOURS_START: number = 8 * this.MINUTES_IN_ONE_HOUR;
  private BUSINESS_HOURS_END: number = 18 * this.MINUTES_IN_ONE_HOUR;
  private WEEKEND_DAYS: Set<number> = new Set([0, 6]);

  private datehours: DateHours;
  private name: Name;
  private email: Email;
  private phone: Phone;

  constructor(name: Name, email: Email, phone: Phone, datehours: DateHours) {
    this.hasDatePassed(datehours.value);
    this.checkBusinessHours(datehours.value);
    this.datehours = datehours;
    this.name = name;
    this.phone = phone;
    this.email = email;
  }

  public get properties(): ScheduleDateType {
    return {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      datehours: this.datehours.value,
    };
  }

  private hasDatePassed(timestamp: Date): void {
    const currentDate: Date = new Date();

    currentDate.setSeconds(0, 0);
    timestamp.setSeconds(0, 0);

    if (timestamp.getTime() <= currentDate.getTime()) {
      throw new Error('Não é possível agendar um compromisso no passado.');
    }
  }

  private checkBusinessHours(timestamp: Date): void {
    const day: number = timestamp.getDay();
    const totalMinutes: number = timestamp.getHours() * this.MINUTES_IN_ONE_HOUR + timestamp.getMinutes();

    if (this.WEEKEND_DAYS.has(day)) {
      throw new Error('Fechado nos fins de semana. Aberto de segunda a sexta.');
    }
    if (totalMinutes < this.BUSINESS_HOURS_START || totalMinutes > this.BUSINESS_HOURS_END) {
      throw new Error('Os compromissos só podem ser agendados entre 8:00 e 18:00.');
    }
  }
}
