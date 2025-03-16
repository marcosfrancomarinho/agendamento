import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminRepositoryInterface } from '../@types/repository/RegisterAdminRepositoryInterface';
import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import { RegisterAdminRepository } from '../repository/RegisterAdminRepository';
import { EncryptPasswordAdapter } from '../utils/EncryptPasswordAdapter';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { UserRegister } from '../domain/entities/UserRegister';
import { IdUser } from '../domain/value-object/IdUser';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { Email } from '../domain/value-object/Email';
import { Password } from '../domain/value-object/Password';
import { Name } from '../domain/value-object/Name';

@injectable()
export class RegisterAdminServices implements RegisterAdminServicesInterface {
  constructor(
    @inject(RegisterAdminRepository) private registerAdmin: RegisterAdminRepositoryInterface,
    @inject(EncryptPasswordAdapter) private encryptPassword: EncryptPasswordAdapterInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  public async register(name: string, email: string, password: string): Promise<IdUser> {
    const _name: Name = await Name.create(name, this.verifyDatas);
    const _email: Email = await Email.create(email, this.verifyDatas);
    const _password: Password = await Password.create(password, this.verifyDatas);

    const userRegister: UserRegister = await UserRegister.create(_name, _email, _password, this.encryptPassword);

    const [{ id }]: QueryResultType[] = await this.registerAdmin.register(userRegister);

    const idUser: IdUser = await IdUser.create(id, this.verifyDatas);
    return idUser;
  }
}
