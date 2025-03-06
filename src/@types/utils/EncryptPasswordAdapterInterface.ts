export interface EncryptPasswordAdapterInterface {
  encode(password: string): Promise<string>;
  compare(encryptedPassword: string, password: string): Promise<boolean>;
}
