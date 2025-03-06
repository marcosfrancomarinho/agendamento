import { inject, injectable } from 'tsyringe';
import { RegisterAdminServicesInterface } from '../@types/services/RegisterAdminServicesInterface';
import { RegisterAdminRepositoryInterface } from '../@types/repository/RegisterAdminRepositoryInterface';
import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import { RegisterAdminRepository } from '../repository/RegisterAdminRepository';
import { EncryptPasswordAdapter } from '../utils/EncryptPasswordAdapter';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';

@injectable()
export class RegisterAdminServices implements RegisterAdminServicesInterface {
  constructor(
    @inject(RegisterAdminRepository) private registerAdminRepository: RegisterAdminRepositoryInterface,
    @inject(EncryptPasswordAdapter) private encryptPasswordAdapter: EncryptPasswordAdapterInterface
  ) {}
  
  public async register(name: string, email: string, password: string): Promise<number> {
    try {
      const encryptedPassword: string = await this.encryptPasswordAdapter.encode(password);
      const [{ id }]: QueryResultType[] = await this.registerAdminRepository.register(name, email, encryptedPassword);
      return id;
    } catch (error) {
      throw error as Error;
    }
  }
}
