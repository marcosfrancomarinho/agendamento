import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class Password {
  constructor(private password: string) {}

  public static async create(password: string, verifyDatas: VerifyDatasAdapterInterface): Promise<Password> {
    await verifyDatas.verifyPassword(password);
    return new Password(password);
  }
  public get value(): string {
    return this.password;
  }

}
