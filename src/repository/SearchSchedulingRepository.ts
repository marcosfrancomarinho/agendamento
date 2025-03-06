import { injectable } from 'tsyringe';
import { ScheduleDateType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { SearchSchedulingRepositoryInterface } from '../@types/repository/SearchSchedulingRepositoryInterface';
import { Database } from '../configs/Database';

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

  public async searchByDate(scheduledDateAndTime: Date): Promise<ScheduleDateType[]> {
    try {
      const { rows } = await Database.connection.query<ScheduleDateType>(this.SQL.DATE, [scheduledDateAndTime]);
      return rows;
    } catch (error) {
      throw error as Error;
    }
  }
}
