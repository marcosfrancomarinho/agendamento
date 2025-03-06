import { injectable } from 'tsyringe';
import { LoginAdminRepositoryInterface } from '../@types/repository/LoginAdminRepositoryInterface';
import { Database } from '../configs/Database';
import { ResponseUserRegisterType } from '../@types/services/LoginAdminServicesInterface';

@injectable()
export class LoginAdminRepository implements LoginAdminRepositoryInterface {
  private readonly SQL: string = 'SELECT * FROM user_admin WHERE email = $1';
  public async login(email: string): Promise<ResponseUserRegisterType[]> {
    try {
      const { rows } = await Database.connection.query<ResponseUserRegisterType>(this.SQL, [email]);
      return rows;
    } catch (error) {
      throw error as Error;
    }
  }
}
