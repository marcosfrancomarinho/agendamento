import { UserLogin } from '../../domain/entities/UserLogin';
import { ResponseUserRegisterType } from '../services/RegisterAdminServicesInterface';

export interface LoginAdminRepositoryInterface {
  login(userLogin: UserLogin): Promise<ResponseUserRegisterType[]>;
}
