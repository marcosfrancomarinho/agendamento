import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class Name {
  constructor(private name: string) {}
  public static async create(name: string, verifyDatas: VerifyDatasAdapterInterface): Promise<Name> {
    await verifyDatas.verifyName(name);
    return new Name(name.trim());
  }

  public get value(): string {
    return this.name;
  }
}
