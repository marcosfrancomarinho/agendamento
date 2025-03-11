import { Scheduling } from "../../entities/Scheduling";

export interface CheckAppointmentServicesInterface {
	check(scheduling: Scheduling): Promise<boolean>;
}
