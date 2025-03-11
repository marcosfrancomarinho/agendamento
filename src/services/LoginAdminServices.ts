import { inject, injectable } from 'tsyringe';
import { LoginAdminServicesInterface, ResponseUserRegisterType } from '../@types/services/LoginAdminServicesInterface';
import { LoginAdminRepositoryInterface } from '../@types/repository/LoginAdminRepositoryInterface';
import { LoginAdminRepository } from '../repository/LoginAdminRepository';
import { EncryptPasswordAdapter } from '../utils/EncryptPasswordAdapter';
import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import { UserLogin } from '../entities/UserLogin';

@injectable()
export class LoginAdminServices implements LoginAdminServicesInterface {
  private messageError: string = 'email ou senha incorreta.';

  constructor(
    @inject(LoginAdminRepository) private loginAdminRepository: LoginAdminRepositoryInterface,
    @inject(EncryptPasswordAdapter) private encryptPasswordAdapter: EncryptPasswordAdapterInterface
  ) {}

  public async login(userLogin: UserLogin): Promise<number> {
    try {
      const responseUserRegister: ResponseUserRegisterType[] = await this.loginAdminRepository.login(userLogin);

      if (!responseUserRegister || responseUserRegister.length === 0) throw new Error(this.messageError);

      const [{ password, id }]: ResponseUserRegisterType[] = responseUserRegister;

      const passwordCheckResult: boolean = await this.encryptPasswordAdapter.compare(
        password,
        userLogin.properties.password
      );
      if (!passwordCheckResult) throw new Error(this.messageError);

      return id;
    } catch (error) {
      throw error as Error;
    }
  }
}
