import { QueryResultType } from '../repository/CreateSchedulingRepositoryInterface';

export interface CreateSchedulingServicesInterface {
	create(name: string, email: string, phone: string, datehours: Date): Promise<QueryResultType>;
}
