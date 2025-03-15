import { VerifyDatasAdapterInterface } from '../../@types/utils/VerifyDatasAdapterInterface';

export class IdUser {
  constructor(private id: number) {}

  public static async create(id: number, verifyDatas: VerifyDatasAdapterInterface): Promise<IdUser> {
    await verifyDatas.verifyId(id);
    return new IdUser(id);
  }
  public get value(): number {
    return this.id;
  }
}
