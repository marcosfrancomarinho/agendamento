export interface PerfomServiceRepositoryInterface {
  perform(id: number): Promise<number| null>;
}
