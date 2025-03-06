export interface CheckAppointmentServicesInterface {
	check(dateHoursCheduling: Date): Promise<boolean>;
}
