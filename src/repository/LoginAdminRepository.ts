import { injectable } from 'tsyringe';
import { LoginAdminRepositoryInterface } from '../@types/repository/LoginAdminRepositoryInterface';
import { Database } from '../configs/Database';
import { ResponseUserRegisterType } from '../@types/services/LoginAdminServicesInterface';
import { UserLogin } from '../entities/UserLogin';

@injectable()
export class LoginAdminRepository implements LoginAdminRepositoryInterface {
  private readonly SQL: string = 'SELECT * FROM user_admin WHERE email = $1';
  public async login(userLogin: UserLogin): Promise<ResponseUserRegisterType[]> {
    try {
      const { rows } = await Database.connection.query<ResponseUserRegisterType>(this.SQL, [
        userLogin.properties.email,
      ]);
      return rows;
    } catch (error) {
      throw error as Error;
    }
  }
}
