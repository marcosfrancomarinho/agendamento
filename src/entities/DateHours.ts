import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';

export class DateHours {
  constructor(private datehours: Date) {}

  public get time(): Date {
    return this.datehours;
  }

  private static MINUTES_IN_ONE_HOUR: number = 60;
  private static BUSINESS_HOURS_START: number = 8 * this.MINUTES_IN_ONE_HOUR;
  private static BUSINESS_HOURS_END: number = 18 * this.MINUTES_IN_ONE_HOUR;
  private static WEEKEND_DAYS: Set<number> = new Set([0, 6]);

  public static async create(datehours: string, verifyDatas: VerifyDatasAdapterInterface): Promise<DateHours> {
    await verifyDatas.verifyDate(datehours);

    const timestamp: Date = new Date(datehours);

    this.hasDatePassed(timestamp);
    this.checkBusinessHours(timestamp);

    return new DateHours(timestamp);
  }

  private static hasDatePassed(timestamp: Date): void {
    const currentDate: Date = new Date();

    currentDate.setSeconds(0, 0);
    timestamp.setSeconds(0, 0);

    if (timestamp.getTime() <= currentDate.getTime()) {
      throw new Error('Não é possível agendar um compromisso no passado.');
    }
  }

  private static checkBusinessHours(timestamp: Date): void {
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
