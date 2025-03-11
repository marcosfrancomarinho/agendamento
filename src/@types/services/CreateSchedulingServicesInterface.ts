import { Scheduling } from '../../entities/Scheduling';
import { QueryResultType } from '../repository/CreateSchedulingRepositoryInterface';

export interface CreateSchedulingServicesInterface {
  create(scheduling: Scheduling): Promise<QueryResultType>;
}
