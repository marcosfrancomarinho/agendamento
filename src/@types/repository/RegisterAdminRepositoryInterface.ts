import { UserRegister } from '../../domain/entities/UserRegister';
import { QueryResultType } from './CreateSchedulingRepositoryInterface';

export interface RegisterAdminRepositoryInterface {
  register(userRegister:UserRegister): Promise<QueryResultType[]>;
}
