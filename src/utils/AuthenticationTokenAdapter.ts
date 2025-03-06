import {
  AuthenticationTokenAdapterInterface,
  HashCheckResponseType,
  MessageErrorType,
} from '../@types/utils/AuthenticationTokenAdapterInterface';
import jwt from 'jsonwebtoken';

export class AuthenticationTokenAdapter implements AuthenticationTokenAdapterInterface {
  private messageError: MessageErrorType;
  private KEY_SECRET: string;

  constructor() {
    this.KEY_SECRET = process.env.KEY_SECRET || '';
    this.messageError = {
      keySecret: 'chave secreta não foi informada',
      id: 'id não foi informado',
      token: 'token não foi informado.',
    };
  }

  public genereteHash(id: number): string {
    try {
      if (this.KEY_SECRET.trim().length === 0) throw new Error(this.messageError.keySecret);
      if (!id || isNaN(id)) throw new Error(this.messageError.id);

      const token: string = jwt.sign({ idUser: id }, this.KEY_SECRET, { algorithm: 'HS256', expiresIn: '1d' });
      return token;
    } catch (error) {
      throw error as Error;
    }
  }

  public verifyHash(token: string): HashCheckResponseType {
    try {
      if (this.KEY_SECRET.trim().length === 0) throw new Error(this.messageError.keySecret);
      if (!token || token.trim().length === 0) throw new Error(this.messageError.token);
      const hashCheckResponse = jwt.verify(token, this.KEY_SECRET) as HashCheckResponseType;
      return hashCheckResponse;
    } catch (error) {
      throw error as Error;
    }
  }
}
