import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class Phone {
  constructor(private phone: string) {}
  public static async create(phone: string, verifyDatas: VerifyDatasAdapterInterface): Promise<Phone> {
    await verifyDatas.verifyPhone(phone);
    return new Phone(phone.trim());
  }

  public get value(): string {
    return this.phone;
  }
}
