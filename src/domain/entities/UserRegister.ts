import { RegisterUserType } from '../../@types/controllers/RegisterAdminControllersInterface';
import { Email } from '../value-object/Email';
import { Name } from '../value-object/Name';
import { Password } from '../value-object/Password';

export class UserRegister {
  constructor(private name: Name, private email: Email, private password: Password) {}

  public get properties(): RegisterUserType {
    return { name: this.name.value, email: this.email.value, password: this.password.value };
  }
  public updatePassword(password: string): void {
    if (!password || password.length === 0) throw new Error('senha não foi definida');
    this.password = new Password(password);
  }
}
