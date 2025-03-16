import { injectable } from 'tsyringe';
import { RegisterAdminRepositoryInterface } from '../@types/repository/RegisterAdminRepositoryInterface';
import { Database } from '../configs/Database';
import { QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { UserRegister } from '../domain/entities/UserRegister';

@injectable()
export class RegisterAdminRepository implements RegisterAdminRepositoryInterface {
  private readonly SQL: string = 'INSERT INTO user_admin (name,email, password, super) VALUES ($1,$2,$3, false) RETURNING id';

  public async register(userRegister: UserRegister): Promise<QueryResultType[]> {
    const { rows } = await Database.connection.query<QueryResultType>(this.SQL, userRegister.properties);
    return rows;
  }
}
