import { EncryptPasswordAdapterInterface } from '../../@types/utils/EncryptPasswordAdapterInterface';
import { Email } from '../value-object/Email';
import { Name } from '../value-object/Name';
import { Password } from '../value-object/Password';

export class UserRegister {
  constructor(private name: Name, private email: Email, private password: Password) {}

  public static async create(name: Name, email: Email, password: Password, encryptPassword: EncryptPasswordAdapterInterface): Promise<UserRegister> {
    const encryptedPassword: string = await encryptPassword.encode(password.value);
    const newPassword = new Password(encryptedPassword);
    return new UserRegister(name, email, newPassword);
  }

  public get properties(): string[] {
    return [this.name.value, this.email.value, this.password.value];
  }
}
