import { LoginUserTypes } from '../../@types/controllers/LoginAdminControllersInterface';
import { EncryptPasswordAdapterInterface } from '../../@types/utils/EncryptPasswordAdapterInterface';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';

export class UserLogin {
  constructor(private email: Email, private password: Password, private encryptPassword: EncryptPasswordAdapterInterface) {}

  public async comparePassword(encryptedPassword: string): Promise<void> {
    if (!encryptedPassword || encryptedPassword.length === 0) throw new Error('senha criptograda não foi encontrada.');
    const responseComparePassword: boolean = await this.encryptPassword.compare(encryptedPassword, this.password.value);
    if (!responseComparePassword) throw new Error('email ou senha incorreta');
  }

  public get properties(): LoginUserTypes {
    return { email: this.email.value, password: this.password.value };
  }
}
