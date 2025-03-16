import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class Email {
  constructor(private email: string) {}
  public static async create(email: string, verifyDatas: VerifyDatasAdapterInterface): Promise<Email> {
    await verifyDatas.verifyEmail(email);
    return new Email(email.trim());
  }

  public get value(): string {
    return this.email;
  }
}
