import { IdUser } from '../../domain/value-object/IdUser';

export interface CreateSchedulingServicesInterface {
  create(name: string, email: string, phone: string, datehours: string): Promise<IdUser>;
}
