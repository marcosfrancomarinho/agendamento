import { Scheduling } from "../../domain/entities/Scheduling";

export interface CheckAppointmentServicesInterface {
	check(scheduling: Scheduling): Promise<void>;
}
