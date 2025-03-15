import { LoginUserTypes } from '../../@types/controllers/LoginAdminControllersInterface';
import { Email } from '../value-object/Email';
import { Password } from '../value-object/Password';

export class UserLogin {
  constructor(private email: Email, private password: Password) {}

  public get properties(): LoginUserTypes {
    return { email: this.email.value, password: this.password.value };
  }
}
