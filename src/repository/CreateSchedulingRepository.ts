import { injectable } from 'tsyringe';
import {
  CreateSchedulingRepositoryInterface,
  QueryResultType,
} from '../@types/repository/CreateSchedulingRepositoryInterface';
import { Database } from '../configs/Database';
import { Scheduling } from '../entities/Scheduling';

@injectable()
export class CreateSchedulingRepository implements CreateSchedulingRepositoryInterface {
  private readonly SQL: string =
    'INSERT INTO scheduling_user (name,email, phone, datehours)VALUES($1,$2,$3,$4) RETURNING id';

  public async create(scheduling: Scheduling): Promise<QueryResultType> {
    const { datehours, email, name, phone } = scheduling.properties;
    try {
      const { rows } = await Database.connection.query<QueryResultType>(this.SQL, [name, email, phone, datehours]);
      return rows.at(0) as QueryResultType;
    } catch (error) {
      throw error as Error;
    }
  }
}
