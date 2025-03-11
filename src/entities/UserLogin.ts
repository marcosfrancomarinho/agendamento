import { LoginUserTypes } from '../@types/controllers/LoginAdminControllersInterface';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';

export class UserLogin {
  constructor(private email: string, private password: string) {}

  public static async create(
    email: string,
    password: string,
    verifyDatas: VerifyDatasAdapterInterface
  ): Promise<UserLogin> {
    await verifyDatas.verifyLoginUser(email, password);
    return new UserLogin(email, password);
  }
  public get properties(): LoginUserTypes {
    return { email: this.email, password: this.password };
  }
}
