export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface WorkScheduleItemDto {
  dayOfWeek: DayOfWeek;
  startTime: string; //
  endTime: string; // "HH:mm"
}
