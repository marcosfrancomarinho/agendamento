import { EncryptPasswordAdapterInterface } from '../@types/utils/EncryptPasswordAdapterInterface';
import bcrypt from 'bcrypt';

export class EncryptPasswordAdapter implements EncryptPasswordAdapterInterface {
  private readonly SALT: number = 10;

  public async encode(password: string): Promise<string> {
    const encryptedPassword: string = await bcrypt.hash(password, this.SALT);
    return encryptedPassword;
  }

  public async compare(encryptedPassword: string, password: string): Promise<boolean> {
    const passwordCheckResult: boolean = await bcrypt.compare(password, encryptedPassword);
    return passwordCheckResult;
  }
}
