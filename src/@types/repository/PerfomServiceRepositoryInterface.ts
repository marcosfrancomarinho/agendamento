import { IdUser } from "../../domain/value-object/IdUser";

export interface PerfomServiceRepositoryInterface {
  perform(idUser:IdUser): Promise<number| null>;
}
