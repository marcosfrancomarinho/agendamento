import { inject, injectable } from 'tsyringe';
import { PerfomServiceServicesInterface } from '../@types/services/PerformServiceServicesInterface';
import { PerfomServiceRepositoryInterface } from '../@types/repository/PerfomServiceRepositoryInterface';
import { PerfomServiceRepository } from '../repository/PerfomServiceRepository';

@injectable()
export class PerfomServiceServices implements PerfomServiceServicesInterface {
  private messageError: string = 'o agendamento informado não foi encontrado.';
  constructor(@inject(PerfomServiceRepository) private perfomServiceRepository: PerfomServiceRepositoryInterface) {}
  public async perfom(id: number): Promise<void> {
    try {
      const isPerfom: number | null = await this.perfomServiceRepository.perform(id);
      if (!isPerfom || isPerfom <= 0) throw new Error(this.messageError);
    } catch (error) {
      throw error as Error;
    }
  }
}
