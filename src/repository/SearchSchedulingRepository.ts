import { injectable } from 'tsyringe';
import { SearchSchedulingRepositoryInterface } from '../@types/repository/SearchSchedulingRepositoryInterface';
import { Database } from '../configs/Database';
import { ScheduleDateType } from '../@types/entities/ScheduleDateTypes';
import { DateHours } from '../entities/DateHours';

@injectable()
export class SearchSchedulingRepository implements SearchSchedulingRepositoryInterface {
  private SQL: { DATE: string; ALL: string } = {
    DATE: 'SELECT * FROM scheduling_user WHERE DATE(datehours) = DATE($1) AND done = false',
    ALL: 'SELECT * FROM scheduling_user',
  };

  public async searchByAll(): Promise<ScheduleDateType[]> {
    try {
      const { rows } = await Database.connection.query<ScheduleDateType>(this.SQL.ALL);
      return rows;
    } catch (error) {
      throw error as Error;
    }
  }

  public async searchByDate(dateHours: DateHours): Promise<ScheduleDateType[]> {
    try {
      const { rows } = await Database.connection.query<ScheduleDateType>(this.SQL.DATE, [dateHours.time]);
      return rows;
    } catch (error) {
      throw error as Error;
    }
  }
}
