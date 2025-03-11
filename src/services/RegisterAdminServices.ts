import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminRepositoryInterface } from '../@types/repository/RegisterAdminRepositoryInterface';
import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import { RegisterAdminRepository } from '../repository/RegisterAdminRepository';
import { EncryptPasswordAdapter } from '../utils/EncryptPasswordAdapter';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { UserRegister } from '../entities/UserRegister';

@injectable()
export class RegisterAdminServices implements RegisterAdminServicesInterface {
  constructor(
    @inject(RegisterAdminRepository) private registerAdminRepository: RegisterAdminRepositoryInterface,
    @inject(EncryptPasswordAdapter) private encryptPasswordAdapter: EncryptPasswordAdapterInterface
  ) {}

  public async register(userRegister: UserRegister): Promise<number> {
    try {
      const encryptedPassword: string = await this.encryptPasswordAdapter.encode(userRegister.properties.password);
      userRegister.updatePassword(encryptedPassword);
      const [{ id }]: QueryResultType[] = await this.registerAdminRepository.register(userRegister);
      return id;
    } catch (error) {
      throw error as Error;
    }
  }
}
