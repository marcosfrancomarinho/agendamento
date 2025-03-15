export interface VerifyDatasAdapterInterface {
  verifyPhone(phone: string): Promise<void>;
  verifyName(name: string): Promise<void>;
  verifyEmail(email: string): Promise<void>;
  verifyDate(datehours: string): Promise<void>;
  verifyId(id: number): Promise<void>;
  verifyPassword(password: string): Promise<void>;
}
