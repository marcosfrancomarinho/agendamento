import { inject, injectable } from 'tsyringe';
import { LoginAdminServicesInterface } from '../@types/services/LoginAdminServicesInterface';
import { LoginAdminRepositoryInterface } from '../@types/repository/LoginAdminRepositoryInterface';
import { LoginAdminRepository } from '../repository/LoginAdminRepository';
import { EncryptPasswordAdapter } from '../utils/EncryptPasswordAdapter';
import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import { UserLogin } from '../domain/entities/UserLogin';
import { Email } from '../domain/value-object/Email';
import { Password } from '../domain/value-object/Password';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { ResponseUserRegisterType } from '../@types/services/RegisterAdminServicesInterface';
import { IdUser } from '../domain/value-object/IdUser';

@injectable()
export class LoginAdminServices implements LoginAdminServicesInterface {
  constructor(
    @inject(LoginAdminRepository) private loginAdmin: LoginAdminRepositoryInterface,
    @inject(EncryptPasswordAdapter) private encryptPassword: EncryptPasswordAdapterInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  public async login(email: string, password: string): Promise<IdUser> {
    const _email: Email = await Email.create(email, this.verifyDatas);
    const _password: Password = await Password.create(password, this.verifyDatas);
    const userLogin: UserLogin = new UserLogin(_email, _password, this.encryptPassword);

    const responseUserRegister: ResponseUserRegisterType[] = await this.loginAdmin.login(userLogin);

    if (!responseUserRegister || responseUserRegister.length === 0) throw new Error('email ou senha incorreta.');

    const [{ password: encryptedPassword, id }] = responseUserRegister;
    await userLogin.comparePassword(encryptedPassword);

    const idUser: IdUser = await IdUser.create(id, this.verifyDatas);
    return idUser;
  }
}
