import { injectable } from 'tsyringe';
import { PerfomServiceRepositoryInterface } from '../@types/repository/PerfomServiceRepositoryInterface';
import { Database } from '../configs/Database';
import { IdUser } from '../domain/value-object/IdUser';

@injectable()
export class PerfomServiceRepository implements PerfomServiceRepositoryInterface {
  private readonly SQL: string = 'UPDATE scheduling_user SET done = true WHERE id = $1';

  public async perform(idUser: IdUser): Promise<number | null> {
    try {
      const { rowCount } = await Database.connection.query(this.SQL, [idUser.value]);
      return rowCount;
    } catch (error) {
      throw error as Error;
    }
  }
}
