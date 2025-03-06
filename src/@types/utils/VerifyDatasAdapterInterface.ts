export interface VerifyDatasAdapterInterface {
  verifyAll(name: string, email: string, phone: string, datehours: Date): Promise<void>;
  verifyDate(datehours: Date): Promise<void>;
  verifyId(id: number): Promise<void>;
  verifyLoginUser(email: string, password: string): Promise<void>;
  verifyRegisterUser(name: string, email: string, password: string): Promise<void>;
}

export type LoginUserTypes = {
  email: string;
  password: string;
};
