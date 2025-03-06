import { LoginUserTypes } from '../utils/VerifyDatasAdapterInterface';

export interface LoginAdminServicesInterface {
  login(email: string, password: string): Promise<number>;
}
export interface ResponseUserRegisterType extends LoginUserTypes {
  id: number;
}
