export interface FormatDataHoursInterface {
  format(datahours: Date): ResponseFormatDataHoursType;
}
export type ResponseFormatDataHoursType = {
  hours: number;
  minutes: number;
  year: number;
  month: number;
  day: number;
};
