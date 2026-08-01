package pl.wk.rehabilitation.ams.dto;

import pl.wk.rehabilitation.as.dto.BasicUserDto;
import pl.wk.rehabilitation.utill._enum.AppointmentStatusEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record GetDetailedAppointmentSlotResponse(
        UUID id,
        AppointmentStatusEnum status,
        BasicUserDto therapist,
        BasicUserDto patient,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String procedureName,
        String notes,
        String medicalAdvice
) {
}
