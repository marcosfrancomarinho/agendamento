import { IdUser } from "../../domain/value-object/IdUser";

export interface PerfomServiceServicesInterface {
  perfom(idUser:IdUser): Promise<void>;
}
