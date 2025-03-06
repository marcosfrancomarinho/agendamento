import { QueryResultType } from './CreateSchedulingRepositoryInterface';

export interface RegisterAdminRepositoryInterface {
  register(name: string, email: string, password: string): Promise<QueryResultType[]>;
}
