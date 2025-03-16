import { IdUser } from '../../domain/value-object/IdUser';

export interface LoginAdminServicesInterface {
  login(email: string, password: string): Promise<IdUser>;
}


