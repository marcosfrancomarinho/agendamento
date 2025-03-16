import { injectable } from 'tsyringe';
import { LoginAdminRepositoryInterface } from '../@types/repository/LoginAdminRepositoryInterface';
import { Database } from '../configs/Database';
import { UserLogin } from '../domain/entities/UserLogin';
import { ResponseUserRegisterType } from '../@types/services/RegisterAdminServicesInterface';

@injectable()
export class LoginAdminRepository implements LoginAdminRepositoryInterface {
  private readonly SQL: string = 'SELECT * FROM user_admin WHERE email = $1';
  public async login(userLogin: UserLogin): Promise<ResponseUserRegisterType[]> {
    const { rows } = await Database.connection.query<ResponseUserRegisterType>(this.SQL, [userLogin.properties.email]);
    return rows;
  }
}
