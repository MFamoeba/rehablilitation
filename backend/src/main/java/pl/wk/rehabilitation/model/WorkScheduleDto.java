package pl.wk.rehabilitation.model;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

public record WorkScheduleDto(UUID id,
                              DayOfWeek dayOfWeek,
                              LocalTime startTime,
                              LocalTime endTime,
                              UUID therapistId) {
}
