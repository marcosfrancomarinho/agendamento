import { Request, Response, NextFunction } from 'express';
import { PerfomServiceControllersInterface } from '../@types/controllers/PerformServiceControllersInterface';
import { inject, injectable } from 'tsyringe';
import { PerfomServiceServices } from '../services/PerformServiceServices';
import { PerfomServiceServicesInterface } from '../@types/services/PerformServiceServicesInterface';

@injectable()
export class PerfomServiceControllers implements PerfomServiceControllersInterface {
  constructor(@inject(PerfomServiceServices) private perfomServiceServices: PerfomServiceServicesInterface) {}

  private messageSuccess(id: number): { message: string } {
    return { message: `Serviço ID: ${id}, realizado com sucesso.` };
  }
  public async perfom(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.query as unknown as { id: number };
      await this.perfomServiceServices.perfom(id);
      response.status(200).json(this.messageSuccess(id));
    } catch (error) {
      next(error);
    }
  }
}
