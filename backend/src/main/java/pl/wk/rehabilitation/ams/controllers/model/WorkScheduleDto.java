package pl.wk.rehabilitation.ams.controllers.model;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.UUID;

public record WorkScheduleDto(UUID id,
                              DayOfWeek dayOfWeek,
                              LocalTime startTime,
                              LocalTime endTime,
                              UUID therapistId) {
}
