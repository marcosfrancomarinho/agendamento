export interface AuthenticationTokenAdapterInterface {
  genereteHash(id: number): string;
  verifyHash(token: string): HashCheckResponseType;
}
export type MessageErrorType = { keySecret: string; id: string; token: string };
export type HashCheckResponseType = { idUser: number; iat: number; exp: number };
