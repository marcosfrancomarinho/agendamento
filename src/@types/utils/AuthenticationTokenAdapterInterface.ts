import { IdUser } from '../../domain/value-object/IdUser';
import { Token } from '../../domain/value-object/Token';

export interface AuthenticationTokenAdapterInterface {
  genereteHash(idUser: IdUser): Token;
  verifyHash(token: Token): HashCheckResponseType;
}
export type HashCheckResponseType = { idUser: number; iat: number; exp: number };
