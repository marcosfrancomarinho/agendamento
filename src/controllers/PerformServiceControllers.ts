import { Request, Response, NextFunction } from 'express';
import { PerfomServiceControllersInterface } from '../@types/controllers/PerformServiceControllersInterface';
import { inject, injectable } from 'tsyringe';
import { PerfomServiceServices } from '../services/PerformServiceServices';
import { PerfomServiceServicesInterface } from '../@types/services/PerformServiceServicesInterface';
import { IdUser } from '../domain/value-object/IdUser';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';

@injectable()
export class PerfomServiceControllers implements PerfomServiceControllersInterface {
  constructor(
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface,
    @inject(PerfomServiceServices) private perfomServiceServices: PerfomServiceServicesInterface
  ) {}

  private messageSuccess(idUser: IdUser): { message: string } {
    return { message: `Serviço ID: ${idUser.value}, realizado com sucesso.` };
  }
  public async perfom(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.query as unknown as { id: number };

      const idUser: IdUser = await IdUser.create(id, this.verifyDatas);

      await this.perfomServiceServices.perfom(idUser);

      response.status(200).json(this.messageSuccess(idUser));
    } catch (error) {
      next(error);
    }
  }
}
