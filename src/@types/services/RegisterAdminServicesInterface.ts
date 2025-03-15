import { UserRegister } from "../../domain/entities/UserRegister";

export interface RegisterAdminServicesInterface {
  register(userRegister:UserRegister): Promise<number>;
}
