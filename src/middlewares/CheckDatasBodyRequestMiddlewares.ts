import { Request, NextFunction, Response } from 'express';
import { CheckDatasBodyRequestMiddlewaresInterface } from '../@types/middlewares/CheckDatasBodyRequestMiddlewaresInterface';
import { LoginUserTypes, VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { ScheduleDateType } from '../@types/controllers/CreateSchedulingControllersInterface';
import { inject, injectable } from 'tsyringe';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { RegisterUserType } from '../@types/controllers/RegisterAdminControllersInterface';

@injectable()
export class CheckDatasBodyRequestMiddlewares implements CheckDatasBodyRequestMiddlewaresInterface {
  constructor(@inject(VerifyDatasAdapter) private verifyDatasAdapter: VerifyDatasAdapterInterface) {}

  public async checkAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, phone, datehours } = request.body as ScheduleDateType;
      await this.verifyDatasAdapter.verifyAll(name, email, phone, datehours);
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }

  public async checkDate(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { datehours } = request.query as unknown as { datehours: Date };
      await this.verifyDatasAdapter.verifyDate(datehours);
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }
  public async checkId(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.query as unknown as { id: number };
      await this.verifyDatasAdapter.verifyId(id);
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }
  public async checkLoginUser(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = request.body as LoginUserTypes;
      await this.verifyDatasAdapter.verifyLoginUser(email, password);
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }
  public async checkRegisterUser(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = request.body as RegisterUserType;
      await this.verifyDatasAdapter.verifyRegisterUser(name, email, password);
      next();
    } catch (error) {
      response.status(400).json({ error: (error as Error).message });
    }
  }
}
