import { injectable } from 'tsyringe';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import Joi, { NumberSchema, StringSchema, ValidationError } from 'joi';

@injectable()
export class VerifyDatasAdapter implements VerifyDatasAdapterInterface {
  public async verifyPhone(phone: string): Promise<void> {
    try {
      const schema: StringSchema<string> = Joi.string()
        .trim()
        .required()
        .empty()
        .regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/)
        .message('O número de telefone não é válido')
        .label('telefone do usuário');
      await schema.validateAsync(phone);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }

  public async verifyDate(datehours: string): Promise<void> {
    try {
      const schema: StringSchema<string> = Joi.string()
        .trim()
        .required()
        .empty()
        .isoDate()
        .message('A data com hora é obrigatória e deve ser no formato ISO ex: 2025-02-13T12:40')
        .label('data e hora do agendamento do usuário');
      await schema.validateAsync(datehours);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }

  public async verifyId(id: number): Promise<void> {
    try {
      const schema: NumberSchema<number> = Joi.number()
        .integer()
        .positive()
        .required()
        .label('id do agendamento do usuário');
      await schema.validateAsync(id);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }

  public async verifyPassword(password: string): Promise<void> {
    try {
      const schema: StringSchema<string> = Joi.string().trim().required().min(8).empty().label('senha do admin');
      await schema.validateAsync(password);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }

  public async verifyName(name: string): Promise<void> {
    try {
      const schema: StringSchema<string> = Joi.string()
        .trim()
        .required()
        .empty()
        .max(50)
        .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
        .message('nome do usuário inválido')
        .label('nome do usuário');

      await schema.validateAsync(name);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }
  public async verifyEmail(email: string): Promise<void> {
    try {
      const schema: StringSchema<string> = Joi.string().trim().required().empty().email().label('email do usuário');
      await schema.validateAsync(email);
    } catch (error) {
      const { message } = (error as ValidationError).details[0];
      throw new Error(message);
    }
  }
}
