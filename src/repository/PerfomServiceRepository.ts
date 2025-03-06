import { injectable } from 'tsyringe';
import { PerfomServiceRepositoryInterface } from '../@types/repository/PerfomServiceRepositoryInterface';
import { Database } from '../configs/Database';

@injectable()
export class PerfomServiceRepository implements PerfomServiceRepositoryInterface {
  private readonly SQL: string = 'UPDATE scheduling_user SET done = true WHERE id = $1';
  
  public async perform(id: number): Promise<number | null> {
    try {
      const { rowCount } = await Database.connection.query(this.SQL, [id]);
      return rowCount;
    } catch (error) {
      throw error as Error;
    }
  }
}
