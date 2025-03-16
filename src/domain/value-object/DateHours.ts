import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class DateHours {
  constructor(private datehours: Date) {}

  public static async create(datehours: string, verifyDatas: VerifyDatasAdapterInterface): Promise<DateHours> {
    await verifyDatas.verifyDate(datehours);
    return new DateHours(new Date(datehours.trim()));
  }

  public get value(): Date {
    return this.datehours;
  }
}
