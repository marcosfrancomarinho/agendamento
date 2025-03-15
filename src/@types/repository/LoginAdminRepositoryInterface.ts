import { UserLogin } from '../../domain/entities/UserLogin';
import { ResponseUserRegisterType } from '../services/LoginAdminServicesInterface';

export interface LoginAdminRepositoryInterface {
  login(userLogin: UserLogin): Promise<ResponseUserRegisterType[]>;
}
