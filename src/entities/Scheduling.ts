import { ScheduleDateType } from '../@types/entities/ScheduleDateTypes';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { DateHours } from './DateHours';

export class Scheduling {
  constructor(private name: string, private email: string, private phone: string, private datehours: DateHours) {}

  public static async create(
    name: string,
    email: string,
    phone: string,
    datehours: DateHours,
    verifyDatas: VerifyDatasAdapterInterface
  ): Promise<Scheduling> {
    await verifyDatas.verifyAll(name, email, phone);
    return new Scheduling(name, email, phone, datehours);
  }

  public get properties(): ScheduleDateType {
    return { name: this.name, email: this.email, phone: this.phone, datehours: this.datehours.time };
  }
}
