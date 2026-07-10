package pl.wk.rehabilitation.ams.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record WorkScheduleItemDto(
                                     DayOfWeek dayOfWeek,
                                     LocalTime startTime,
                                     LocalTime endTime) {
}
