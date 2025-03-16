import { IdUser } from '../../domain/value-object/IdUser';
import { LoginUserTypes } from '../controllers/LoginAdminControllersInterface';

export interface RegisterAdminServicesInterface {
  register(name: string, email: string, password: string): Promise<IdUser>;
}
export interface ResponseUserRegisterType extends LoginUserTypes {
  id: number;
}
