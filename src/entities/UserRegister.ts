import { RegisterUserType } from '../@types/controllers/RegisterAdminControllersInterface';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';

export class UserRegister {
  constructor(private name: string, private email: string, private password: string) {}

  public static async create(
    name: string,
    email: string,
    password: string,
    verifyDatas: VerifyDatasAdapterInterface
  ): Promise<UserRegister> {
    await verifyDatas.verifyRegisterUser(name, email, password);
    return new UserRegister(name, email, password);
  }
  public get properties(): RegisterUserType {
    return { name: this.name, email: this.email, password: this.password };
  }
  public updatePassword(password: string): void {
    this.password = password;
  }
}
