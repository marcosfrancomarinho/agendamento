import { ResponseUserRegisterType } from '../services/LoginAdminServicesInterface';

export interface LoginAdminRepositoryInterface {
  login(email: string): Promise<ResponseUserRegisterType[]>;
}
