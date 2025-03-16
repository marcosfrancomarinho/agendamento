import { inject, injectable } from 'tsyringe';
import { CreateSchedulingRepositoryInterface, QueryResultType } from '../@types/repository/CreateSchedulingRepositoryInterface';
import { CheckAppointmentServicesInterface } from '../@types/services/CheckAppointmentServicesInterface';
import { CreateSchedulingServicesInterface } from '../@types/services/CreateSchedulingServicesInterface';
import { CreateSchedulingRepository } from '../repository/CreateSchedulingRepository';
import { CheckAppointmentServices } from './CheckAppointmentServices';
import { Scheduling } from '../domain/entities/Scheduling';
import { DateHours } from '../domain/value-object/DateHours';
import { Email } from '../domain/value-object/Email';
import { Name } from '../domain/value-object/Name';
import { Phone } from '../domain/value-object/Phone';
import { VerifyDatasAdapter } from '../utils/VerifyDatasAdapter';
import { VerifyDatasAdapterInterface } from '../@types/utils/VerifyDatasAdapterInterface';
import { IdUser } from '../domain/value-object/IdUser';

@injectable()
export class CreateSchedulingServices implements CreateSchedulingServicesInterface {
  constructor(
    @inject(CreateSchedulingRepository) private createSchedulingRepository: CreateSchedulingRepositoryInterface,
    @inject(CheckAppointmentServices) private checkAppointmentServices: CheckAppointmentServicesInterface,
    @inject(VerifyDatasAdapter) private verifyDatas: VerifyDatasAdapterInterface
  ) {}

  public async create(name: string, email: string, phone: string, datehours: string): Promise<IdUser> {
    const _name: Name = await Name.create(name, this.verifyDatas);
    const _email: Email = await Email.create(email, this.verifyDatas);
    const _phone: Phone = await Phone.create(phone, this.verifyDatas);
    const _datehours: DateHours = await DateHours.create(datehours, this.verifyDatas);

    const scheduling: Scheduling = new Scheduling(_name, _email, _phone, _datehours);

    await this.checkAppointmentServices.check(scheduling);
    const { id }: QueryResultType = await this.createSchedulingRepository.create(scheduling);

    const idUser: IdUser = await IdUser.create(id, this.verifyDatas);
    return idUser;
  }
}
