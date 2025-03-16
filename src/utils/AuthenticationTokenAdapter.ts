import { AuthenticationTokenAdapterInterface, HashCheckResponseType } from '../@types/utils/AuthenticationTokenAdapterInterface';
import jwt, { SignOptions } from 'jsonwebtoken';
import { IdUser } from '../domain/value-object/IdUser';
import { Token } from '../domain/value-object/Token';
import { KeySecret } from '../domain/value-object/KeySecret';

export class AuthenticationTokenAdapter implements AuthenticationTokenAdapterInterface {
  public genereteHash(idUser: IdUser): Token {
    const options: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };
    const payload = { idUser: idUser.value };
    const key: KeySecret = new KeySecret(process.env.KEY_SECRET);
    const hash: string = jwt.sign(payload, key.value, options);
    return new Token(hash);
  }

  public verifyHash(token: Token): HashCheckResponseType {
    const key: KeySecret = new KeySecret(process.env.KEY_SECRET);
    const hashCheckResponse = jwt.verify(token.value, key.value) as HashCheckResponseType;
    return hashCheckResponse;
  }
}
