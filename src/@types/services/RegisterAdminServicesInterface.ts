import { UserRegister } from "../../entities/UserRegister";

export interface RegisterAdminServicesInterface {
  register(userRegister:UserRegister): Promise<number>;
}
