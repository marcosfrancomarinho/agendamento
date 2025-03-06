export interface RegisterAdminServicesInterface {
  register(name: string, email: string, password: string): Promise<number>;
}
