export interface CreateSchedulingRepositoryInterface {
  create(name: string, email: string, phone: string, datehours: Date): Promise<QueryResultType>;
}
export type QueryResultType = { id: number };
