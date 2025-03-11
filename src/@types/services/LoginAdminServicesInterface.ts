import { UserLogin } from '../../entities/UserLogin';
import { LoginUserTypes } from '../controllers/LoginAdminControllersInterface';

export interface LoginAdminServicesInterface {
  login(userLogin: UserLogin): Promise<number>;
}


export interface ResponseUserRegisterType extends LoginUserTypes {
  id: number;
}