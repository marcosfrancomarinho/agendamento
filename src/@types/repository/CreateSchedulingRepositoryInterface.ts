import { Scheduling } from '../../domain/entities/Scheduling';

export interface CreateSchedulingRepositoryInterface {
  create(scheduling: Scheduling): Promise<QueryResultType>;
}
export type QueryResultType = { id: number };
