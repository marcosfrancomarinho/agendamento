export interface VerifyDatasAdapterInterface {
  verifyAll(name: string, email: string, phone: string): Promise<void>;
  verifyDate(datehours: string): Promise<void>;
  verifyId(id: number): Promise<void>;
  verifyLoginUser(email: string, password: string): Promise<void>;
  verifyRegisterUser(name: string, email: string, password: string): Promise<void>;
}

